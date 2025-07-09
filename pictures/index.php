<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/beadando.css" title="normal">
    <link rel="stylesheet" type="text/css" href="css/ohno.css">
	<link rel="alternate stylesheet" type="text/css" href="css/nagybetus.css" title="nagybetus">
    <title>Főoldal - Rózsár Vince honlapja</title>
    <link rel="icon" type="image/x-icon" href="fooldal/dark-logo.png">
    <script type="text/javascript" src="scripts/styleswitcher.js"></script>
    <script type="text/javascript" src="scripts/menu.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>
    <header>
    <nav id="tartalomraugras">
		<a href="#tartalom" class="rejtett">Ugrás a tartalomra</a>
	</nav>
    <div class="parallax">
        <nav id="gyengenlato">
        <div class="navbar">
            <img src="fooldal/logo.png" alt="Logo" class="logo">
            <!-- <a href="#" id="mobile-menu-toggle" class="icon">&#9776;</a>  Toggle button added here -->
            <a href="index.php" class="current">Főoldal</a>
            <a href="portrek.php">Munkáim</a>
            <a href="rolam.php">Rólam</a>
            <a href="kontakt.php">Kontakt</a>
          </div>
        </nav>
        <aside id="mySidepanel" class="sidepanel">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
            <a href="index.php" class="current">Főoldal</a>
            <a href="portrek.php">Munkáim</a>
            <a href="rolam.php">Rólam</a>
            <a href="kontakt.php">Kontakt</a>
        </aside>
          
          <button class="openbtn" onclick="toggleNav()">☰ Menü</button>
    
          
    </div>
    </header>

    <main id="tartalom">
    <div class="telefondiv">
        Örökítsük meg együtt <br>a fontos pillanatokat
    </div>

    <section class="fooldal">

        <h1 class="eleje" >Emléket szeretne ajándékozni? <br> Találjunk egy érdekes helyszínt, készítsünk különleges képeket, és lepjünk meg vele magunkat, vagy szeretteinket.</h1>

        <div class="slideshow-container">
            <figure class="mySlides fade"><img src="fooldal/carousel2.jpg" class="imgwidth" alt="Egy énekes szelfit készít egy rajongójával a tömeg előtt."></figure> 
            <figure class="mySlides fade"><img src="fooldal/carousel3.jpg" class="imgwidth" alt="Portré egy kék ruhás nőről egy régi épületben."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel4.jpg" class="imgwidth" alt="Fiatalok táncolnak és énekelnek a szalagavatójukon."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel6.jpg" class="imgwidth" alt="Valmar zenekar koncertje."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel7.jpg" class="imgwidth" alt="Látványos fényjáték lányok fellépésében."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel8.jpg" class="imgwidth" alt="Zenés táncos musical fellépés."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel9.jpg" class="imgwidth" alt="EDDA Művek koncertje."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel10.jpg" class="imgwidth" alt="Wellhello zenekar koncertje."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel11.jpg" class="imgwidth" alt="Egy fiatal nő konferál."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel12.jpg" class="imgwidth" alt="Valmar zenekar koncertje."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel13.jpg" class="imgwidth" alt="Látványos fényjáték lányok fellépésében."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel14.jpg" class="imgwidth" alt="Bohemian Betyars zenekar koncertje"></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel15.jpg" class="imgwidth" alt="Látványos fényjáték lányok fellépésében."></figure>
            <figure class="mySlides fade"><img src="fooldal/carousel1.jpg" class="imgwidth" alt="Egy zenekar esti koncertet tart kék megvilágításban."></figure> 
            <figure class="mySlides fade"><img src="fooldal/carousel5.jpg" class="imgwidth" alt="Gyerekek feltett kézzel énekelnek a bálon."></figure>
        </div>
            <script>
                let slideIndex = 0;
                showSlides();
                
                function showSlides() {
                  let i;
                  let slides = document.getElementsByClassName("mySlides");
                  for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";  
                  }
                  slideIndex++;
                  if (slideIndex > slides.length) {slideIndex = 1}    
                  slides[slideIndex-1].style.display = "block";  
                  setTimeout(showSlides, 5000); // Change image every 2 seconds
                }
                </script>
        
        
        <div class="videodiv">
        <video autoplay muted loop class="video">
            <source src="fooldal/video.mp4" type="video/mp4">
            <p>A böngészője nem támogatja ezt az állományt</p>
            <a href="fooldal/video.mp4">A videó letölthető mp4 formátumban</a>
        </video>
        <div class="videoszoveg">
            <h2>Mert többet érdemelsz egy szelfinél...</h2>
        </div>
        
        
        </div>
        
        
    
    
    </section>
    <section class="parallax2">

    </section>

    <section class="temak">
        <p class="temak_cim" > Legyen szó portréfotózásról, 
            céges eseményekről vagy szalagavatóról, minden pillanat egyedi és megismételhetetlen.
            <br>
            <br> <strong> Keressen bizalommal, hogy megörökíthessem élete legszebb pillanatait!</strong>
        </p>
        
        <div class="flex_temak">
            <div class="card">
                <img src="../fooldal/portre-ROV_7038-kell-Enhanced-NR-4109-2003.jpg" alt="">
                <h2>Portré</h2>
            </div>
            
            
            
            
            <div class="card">
                <img src="../fooldal/koncert-ROV_5952-kell-Enhanced-NR-4100-2005.jpg" alt="">
                <h2>Koncert</h2>
            </div>
            <div class="card">
                <img src="../fooldal/tarsadalmi-ROV_7829-Enhanced-NR-4071-2007.jpg" alt="">
                <h2>Társadalmi esemény</h2>
            </div>
            <div class="card">
                <img src="../fooldal/ceges-ROV_4528-Enhanced-NR-2206-2009.jpg" alt="">
                <h2>Céges rendezvény</h2>
            </div>
            
            <div class="card">
                <img src="../fooldal/e-ROV_3036-kell-Enhanced-NR-4402-2010.jpg" alt="">
                <h2>Szalagavató</h2>
            </div>
            <div class="card">
                <img src="../fooldal/koszor-ROV_3794-kell-4076-2002.jpg" alt="">
                <h2>Koszorúcska</h2>
            </div>

            
        </div>
        <p>
            <a href="portrek.php">És még sok más...</a>
        </p>
        
    </section>

    <section class="parallax3">

    </section>
    </main>

    
    
    <footer>
    <div class="social-oldal">
    <div class="flex-container-social">
        <div><a target="_blank" href="https://www.facebook.com/rozsarvince" class="fa2 fa fa-facebook"></a></div>
        <div><a target="_blank" href="https://www.instagram.com/rozsarvince_ro_vin/" class="fa2 fa fa-instagram"></a></div>
    </div>
    </div>
    <div class="cr">Budapest © 2024 Rózsár Réka</div>
    </footer>
    
</body>
</html>