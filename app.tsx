"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Heart, ShoppingBag, Menu, User, Phone, ChevronLeft, ChevronRight } from "lucide-react"

// Simulating UI components (you would typically import these from a UI library)
const Button = ({ children, ...props }) => <button {...props}>{children}</button>
const Input = ({ ...props }) => <input {...props} />
const Sheet = ({ children }) => <div>{children}</div>
const SheetTrigger = ({ children }) => <div>{children}</div>
const SheetContent = ({ children }) => <div>{children}</div>
const SheetHeader = ({ children }) => <div>{children}</div>
const SheetTitle = ({ children }) => <h3>{children}</h3>
const Dialog = ({ children }) => <div>{children}</div>
const DialogTrigger = ({ children }) => <div>{children}</div>
const DialogContent = ({ children }) => <div>{children}</div>
const DialogHeader = ({ children }) => <div>{children}</div>
const DialogTitle = ({ children }) => <h3>{children}</h3>
const Tabs = ({ children }) => <div>{children}</div>
const TabsList = ({ children }) => <div>{children}</div>
const TabsTrigger = ({ children }) => <div>{children}</div>
const TabsContent = ({ children }) => <div>{children}</div>

// Types
interface Product {
  id: number
  name: string
  price: number
  image: string
  discount: number
  category: string
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    discount: 20,
    category: "Men",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 2499,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    discount: 15,
    category: "Women",
  },
  // Add more products here...
]

const offerSlides = [
  {
    title: "SUMMER SALE",
    subtitle: "UP TO 50% OFF",
    image:
      "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "NEW ARRIVALS",
    subtitle: "SHOP THE LATEST TRENDS",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "FREE SHIPPING",
    subtitle: "ON ORDERS OVER $100",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
]

const categories = ["All", "Men", "Women", "Kids", "Accessories", "Sale"]

const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour", "New Balance", "Asics", "Fila", "Converse", "Vans"]

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4]">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsWishlisted(!isWishlisted)
              }}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
              -{product.discount}%
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{(product.price * (1 + product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">Add to Cart</Button>
            <Button className="flex-1">Buy Now</Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [productsData, setProductsData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, this would be an API call
        setProductsData(products)
        setLoading(false)
      } catch (err) {
        setError("Error fetching products. Please try again later.")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % offerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletter(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 text-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Phone className="h-4 w-4" />
          <span>Customer Care: 1-800-The Manor and Main</span>
        </div>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-white hover:text-gray-200">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign In or Register</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="space-y-4">
                  <Input type="email" placeholder="Enter your email" />
                  <Input type="password" placeholder="Password" />
                  <Button className="w-full">Sign In with Email</Button>
                </TabsContent>
                <TabsContent value="phone" className="space-y-4">
                  <Input type="tel" placeholder="Enter your phone number" />
                  <Button className="w-full">Send OTP</Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" className="text-white hover:text-gray-200">
            Track Order
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                THE MANOR AND MAIN
              </h1>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button type="submit" size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
                  </SheetHeader>
                  {/* Cart items would go here */}
                </SheetContent>
              </Sheet>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="space-y-4">
                    {categories.map((category) => (
                      <a
                        key={category}
                        href="#"
                        className="block py-2 hover:text-primary"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-4 mt-4 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={`text-lg ${selectedCategory === category ? "text-purple-600 font-bold" : "text-gray-600"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative bg-gray-900 text-white py-20 text-center overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="relative container mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={offerSlides[currentSlide].image || "/placeholder.svg"}
              alt={offerSlides[currentSlide].title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0"
            />
            <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{offerSlides[currentSlide].title}</h2>
              <p className="text-2xl md:text-4xl mb-8">{offerSlides[currentSlide].subtitle}</p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + offerSlides.length) % offerSlides.length)}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % offerSlides.length)}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Animated Brand Names */}
      <div className="py-8 bg-gray-100 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {brands.concat(brands).map((brand, index) => (
            <span key={index} className="mx-4 text-2xl font-bold text-gray-500">
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Video Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Video</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and updates</p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="bg-gray-800 border-gray-700" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Newsletter Popup */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="mb-4">Get the latest updates on new products and upcoming sales.</p>
              <Input type="email" placeholder="Enter your email" className="mb-4" />
              <div className="flex justify-between">
                <Button onClick={() => setShowNewsletter(false)}>Subscribe</Button>
                <Button variant="outline" onClick={() => setShowNewsletter(false)}>
                  No, thanks
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
