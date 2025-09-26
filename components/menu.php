<header class="main-header">
    <div class="container container--big">
        <div class="header-wrapper">
            <!-- Logo -->
            <div class="logo">
                <a href="<?php echo home_url(); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="TecLab">
                </a>
            </div>

            <!-- Menu Desktop -->
            <nav class="main-nav">
                <ul class="nav-menu">
                    <li><a href="#teclab" class="text-medium hover-underline">TECLAB</a></li>
                    <li><a href="#sobre-selos" class="text-medium hover-underline">SOBRE OS SELOS</a></li>
                    <li><a href="#como-funcionam-os-testes" class="text-medium hover-underline">OS TESTES</a></li>
                    <li><a href="#qual-escolher" class="text-medium hover-underline">QUAL ESCOLHER</a></li>
                    <li><a href="#por-que-confiar" class="text-medium hover-underline">POR QUE CONFIAR</a></li>
                </ul>
            </nav>

            <!-- Menu Mobile Toggle -->
            <div class="mobile-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- Menu Mobile -->
            <nav class="mobile-nav">
                <!-- Cabeçalho do Menu Mobile -->
                <div class="mobile-nav-header">
                    <div class="mobile-logo">
                        <a href="<?php echo home_url(); ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="TecLab">
                        </a>
                    </div>
                    <button class="mobile-close" aria-label="Fechar menu">
                        <span></span>
                        <span></span>
                    </button>
                </div>
                
                <ul class="mobile-menu">
                    <li><a href="#teclab">TECLAB</a></li>
                    <li><a href="#sobre-selos">SOBRE OS SELOS</a></li>
                    <li><a href="#como-funcionam-os-testes">OS TESTES</a></li>
                    <li><a href="#qual-escolher">QUAL ESCOLHER</a></li>
                    <li><a href="#por-que-confiar">POR QUE CONFIAR</a></li>
                </ul>
            </nav>
        </div>
    </div>
</header> 