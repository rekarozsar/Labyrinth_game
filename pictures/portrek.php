<?php
  require_once('Storage.php');

  $pictureStorage = new Storage(new JsonIO('pictures.json'));

  function isCategory($category){
    return function($picture) use ($category){
      return $picture['category'] === $category;
    };
  }

  session_start();

  if (isset($_GET['cat'])) {
    $_SESSION['category'] = $_GET['cat'];
} elseif (!isset($_GET['category'])) {
    $_SESSION['category'] = 'all'; // Default category
}

// Retrieve the active category from the session.
$activeCategory = $_SESSION['category'];

// Filter pictures based on the active category.
if ($activeCategory === 'all') {
    $pictures = $pictureStorage->findAll();
} else {
    $pictures = $pictureStorage->findMany(isCategory($activeCategory));
}

// Distribute pictures into columns for the grid.
$columns = [[], [], []];
$totalColumns = 3;
$columnIndex = 0;

foreach ($pictures as $picture) {
    $columns[$columnIndex][] = $picture;
    $columnIndex = ($columnIndex + 1) % $totalColumns; // Cycle through columns
}

function isActive($category) {
    global $activeCategory;
    return $activeCategory === $category ? 'active' : '';
}

function getPictureIndexByName($pictures, $name) {
  $count = 1;
  foreach ($pictures as $picture) {
    if ($picture['name'] === $name) {
      return $count;
    }
    $count++;
  }
  return -1; // Return -1 if the picture is not found
}

// Example usage


  /*
  $_SESSION['category'] = 'all';

  function isActive($category){
    return isset($_SESSION['category']) && $_SESSION['category'] === $category;
  }

  if(isset($_GET['cat'])){
    $pictures = $pictureStorage->findMany(isCategory($_GET['cat']));
  }
  else{
    $pictures = $pictureStorage->findAll();
  }
  

  $columns = [[], [], []];
  foreach ($pictures as $index => $picture) {
    $columns[$index % 3][] = $picture;
  }*/

?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/beadando.css" title="normal">
    <link rel="stylesheet" type="text/css" href="css/ohno.css">
	<link rel="alternate stylesheet" type="text/css" href="css/nagybetus.css" title="nagybetus">
    <title>Munkáim - Rózsár Vince honlapja</title>
    <script type="text/javascript" src="scripts/styleswitcher.js"></script>
    <script type="text/javascript" src="scripts/menu.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>

    <header>
        <nav id="tartalomraugras">
            <a href="#tartalom" class="rejtett">Ugrás a tartalomra</a>
        </nav>
    <nav>
    <div class="navbar">
        <img src="fooldal/logo.png" alt="Logo" class="logo">
        <a href="index.php">Főoldal</a>
        <a href="portrek.php" class="current">Munkáim</a>
        <a href="rolam.php">Rólam</a>
        <a href="kontakt.php">Kontakt</a>
        
      </div>
    </nav>
    <div id="mySidepanel" class="sidepanel">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <a href="index.php">Főoldal</a>
        <a href="portrek.php" class="current">Munkáim</a>
        <a href="rolam.php">Rólam</a>
        <a href="kontakt.php">Kontakt</a>
        
    </div>
      
      <button class="openbtn" onclick="toggleNav()">☰ Menü</button>

      
    
    </header>
    

    
    <main id="tartalom">
      <div class="lejjebblegyszi"><h1>Munkáim</h1></div>

      <article class="szoveg">Szeretem az elkapott pillanatokat megörökíteni. Szeretem, ha közösen tudjuk megteremteni a fotózás kellemes atmoszféráját... Szeretem látni a mosolyt a kész fotók láttán...</article>

      <div id="myBtnContainer" class="btncontainer">
        <a href="portrek.php"><button class="btn <?= isActive('all')?>" onclick="filterSelection('all')"> Összes</button></a>
        <a href="portrek.php?cat=p"><button class="btn <?= isActive('p') ?>" onclick="filterSelection('p')"> Portrék - fashion</button></a>
        <a href="portrek.php?cat=m"><button class="btn <?= isActive('m') ?>" onclick="filterSelection('m')"> Koncertek</button></a>
        <a href="portrek.php?cat=s"><button class="btn <?= isActive('s') ?>" onclick="filterSelection('s')"> Sport</button></a>
        <a href="portrek.php?cat=e"><button class="btn <?= isActive('e') ?>" onclick="filterSelection('s')"> Események</button></a>
        <a href="portrek.php?cat=pre"><button class="btn <?= isActive('pre') ?>" onclick="filterSelection('s')"> Press fotók</button></a>
      </div>

      <div class="griddiv">
      <div class="row"> 
        <?php foreach ($columns as $column) : ?>
          <div class="column">
            <?php foreach ($column as $picture) : ?>
              
                <img src="<?= $picture['path'] ?>" class="imgwidth hover-shadow cursor <?= $picture['category']?> " alt="<?= $picture['alt'] ?>" onclick="openModal();currentSlide(<?= getPictureIndexByName($pictures, $picture['name']) ?>)">
              
            <?php endforeach; ?>
          </div>
        <?php endforeach; ?>
      </div>

      <div class="modal" id="myModal">
        <span class="close cursor" onclick="closeModal()">&times;</span>
        <div class="modal-content">
          <?php foreach ($pictures as $index => $picture) : ?>
            <div class="mySlides">
              <div class="numbertext"><?= getPictureIndexByName($pictures, $picture['name']) ?> / <?= count($pictures) ?></div>
              <img src="<?= $picture['path'] ?>" style="width:100%">
            </div>
          <?php endforeach; ?>
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
      </div>


        <!--
        <div class="row"> 
            <div class="column">
                
            </div>

            <div class="column">
                <a target="_blank" href="porte/portre3.jpg">
                <img src="porte/portre3_kicsinyitett3.jpg" class="imgwidth" alt="Portré egy fekete hajú nőről napszemüvegben. Épp tolja le a napszemüvegét és a kamerába néz."></a>
            </div>

            <div class="column">
                <a target="_blank" href="porte/portre4.png">
                <img src="porte/portre4_kicsinyitett4.jpg" class="imgwidth" alt="Portré egy vörös hajú nőről az erdőben. A távolba néz."></a>
                <a target="_blank" href="porte/portre5.jpg">
                <img src="porte/portre5_kicsinyitett5.jpg" class="imgwidth" alt="Portré egy fekete hajú nőről lila ruhában, tetoválásokkal a kezén és mellkasán."></a>
            </div>
        </div>
        -->
      
    </main>
    

    
    <footer>
      <div class="cr">Budapest © 2024 Rózsár Réka</div>
    </footer>
    
    <script>
      filterSelection("all")
      function filterSelection(c) {
        var x, i;
        x = document.getElementsByClassName("imgwidth");
        if (c == "all") c = "";
        for (i = 0; i < x.length; i++) {
          w3RemoveClass(x[i], "show");
          if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
        }
      }

      function w3AddClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
          if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
        }
      }

      function w3RemoveClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
          while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
          }
        }
        element.className = arr1.join(" ");
      }






      var btnContainer = document.getElementById("myBtnContainer");
      var btns = btnContainer.getElementsByClassName("btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(){
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
        });
      }
    </script>

    <!-- Lightbox js -->
    <script>
      function openModal() {
        document.getElementById("myModal").style.display = "block";
      }

      function closeModal() {
        document.getElementById("myModal").style.display = "none";
      }

      var slideIndex = 1;
      showSlides(slideIndex);

      function plusSlides(n) {
        showSlides(slideIndex += n);
      }

      function currentSlide(n) {
        showSlides(slideIndex = n);
      }

      function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        slides[slideIndex-1].style.display = "block";
        
        
      }
    </script>
</body>
</html>