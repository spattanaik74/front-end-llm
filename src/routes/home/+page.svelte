<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #007bff;
      color: #fff;
      font-family: Arial, sans-serif;
    }
    .navbar {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .navbar-brand {
      font-size: 1.8rem;
      color: #007bff;
    }
    .navbar-nav .nav-link {
      font-size: 1.1rem;
      color: #333;
    }
    .navbar-nav .nav-link:hover {
      color: #007bff;
    }
    .jumbotron {
      background: linear-gradient(to right, #007bff, #0062cc);
      color: #fff;
      padding: 100px 0;
      border-radius: 0;
    }
    .jumbotron h1 {
      font-size: 3.5rem;
    }
    .jumbotron p {
      font-size: 1.2rem;
    }
    .btn-primary {
      background-color: #fff;
      color: #007bff;
      border-color: #fff;
    }
    .btn-primary:hover {
      background-color: #f8f9fa;
      color: #007bff;
      border-color: #f8f9fa;
    }
  </style>
</head>
<body>

  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light shadow-lg">
    <div class="container">
      <a class="navbar-brand" href="#">svelteApp</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/chatbot">Chatbot</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/predict_weather">Weather Prediction</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/price_predict">Price Prediction</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="container mt-5">
    <div class="jumbotron text-center">
      <h1 class="display-4">Welcome back...</h1>
      <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fermentum magna non eros sollicitudin, in cursus orci ultricies.</p>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@1.16.0/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>


</body>
</html>
