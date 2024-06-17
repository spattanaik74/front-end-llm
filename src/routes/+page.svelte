<script>
    import '../app.css'
</script>

<slot></slot>



<body class="bg-gray-100">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-800 min-h-screen flex items-center justify-center">
        <div class="text-center text-white">
            <h1 class="text-5xl font-bold mb-8">Visit to Us</h1>
            <p class="text-lg mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fermentum magna non eros sollicitudin, in cursus orci ultricies.</p>
            <a href="/register" class="inline-block bg-white text-blue-500 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-400 hover:text-white transition duration-300">Get Started</a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-0 left-0 w-full bg-gray-800 text-white py-4">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2024 Awesome Company. All rights reserved.</p>
        </div>
    </footer>
</body>