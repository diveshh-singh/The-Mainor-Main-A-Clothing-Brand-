"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, ShoppingBag, Camera, Menu, User, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const cameraRef = useRef<HTMLInputElement>(null)

  const offerSlides = [
    { title: "SATURDAY SPECIAL", subtitle: "UP TO 80% OFF" },
    { title: "NEW ARRIVALS", subtitle: "FRESH STYLES JUST IN" },
    { title: "SUMMER COLLECTION", subtitle: "GET READY FOR THE SUN" },
  ]

  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: 49.99,
      image: "https://www.westside.com/cdn/shop/files/300989852BROWN_1.jpg?v=1733990524&width=1946",
      discount: 20,
      category: "Men",
    },
    {
      id: 2,
      name: "Denim Jeans",
      price: 79.99,
      image: "https://www.westside.com/cdn/shop/files/300989852BROWN_1.jpg?v=1733990524&width=1946",
      discount: 15,
      category: "Women",
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: 199.99,
      image: "https://www.westside.com/cdn/shop/files/300989852BROWN_1.jpg?v=1733990524&width=1946",
      discount: 30,
      category: "Men",
    },
    {
      id: 4,
      name: "Summer Dress",
      price: 59.99,
      image: "https://www.westside.com/cdn/shop/files/300989852BROWN_1.jpg?v=1733990524&width=1946",
      discount: 25,
      category: "Women",
    },
    {
      id: 5,
      name: "Casual Sneakers",
      price: 89.99,
      image: "https://www.westside.com/cdn/shop/files/300989852BROWN_1.jpg?v=1733990524&width=1946",
      discount: 10,
      category: "Kids",
    },
    {
      id: 6,
      name: "Designer Watch",
      price: 299.99,
      image: "https://www.westside.com/cdn/shop/files/300989852BROWN_1.jpg?v=1733990524&width=1946",
      discount: 40,
      category: "Accessories",
    },
    // Add more products here...
  ]

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const addToCart = (id: number) => {
    setCartItems((prev) => [...prev, id])
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  const handleCameraClick = () => {
    if (cameraRef.current) {
      cameraRef.current.click()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Implement image search functionality here
      console.log("Uploaded image:", file.name)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % offerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 text-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Phone className="h-4 w-4" />
          <span>Customer Care: 1-800-ADAG-FASHION</span>
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
              <Button type="button" size="icon" variant="outline" onClick={handleCameraClick}>
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraRef}
                className="hidden"
                onChange={handleImageUpload}
              />
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
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="space-y-4">
                    <a href="#" className="block py-2 hover:text-primary">
                      Men
                    </a>
                    <a href="#" className="block py-2 hover:text-primary">
                      Women
                    </a>
                    <a href="#" className="block py-2 hover:text-primary">
                      Kids
                    </a>
                    <a href="#" className="block py-2 hover:text-primary">
                      Accessories
                    </a>
                    <a href="#" className="block py-2 hover:text-primary">
                      Sale
                    </a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-8 mt-4">
            {["All", "Men", "Women", "Kids", "Accessories", "Sale"].map((category) => (
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
        <div className="absolute inset-0 bg-black/50"></div>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="relative container mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{offerSlides[currentSlide].title}</h2>
            <p className="text-2xl md:text-4xl mb-8">{offerSlides[currentSlide].subtitle}</p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop Now
            </Button>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + offerSlides.length) % offerSlides.length)}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % offerSlides.length)}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[3/4]">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-white/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(product.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
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
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(product.id)
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

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
    </div>
  )
}
