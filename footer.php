
<footer class="footer">
    <div class="container container--big">
        <!-- Box especial com background de vídeo -->
        <div class="footer__video-box">
            <video class="footer__video-bg" autoplay muted loop>
                <source src="<?php echo get_template_directory_uri(); ?>/assets/img/bg-video.mp4" type="video/mp4">
            </video>
            <div class="footer__video-content">
                <div class="footer__video-column">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo-icon.png" alt="TecLab Logo" class="footer__video-logo">
                    <p class="footer__video-text text-medium-big">QUER SABER <br />MAIS?</p>
                </div>
                <div class="footer__video-column">
                    <p class="footer__video-search text-medium">Pesquise por TecLab e descubra por que somos <br /> referência em credibilidade e confiança.</p>
                </div>
            </div>
        </div>
        
        <!-- Rodapé principal -->
        <div class="footer__main">
            <div class="footer__bottom">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="TecLab Logo" class="footer__logo">
                <p class="footer__copyright text-small">TecLab © 2025 Todos os direitos reservados.</p>
            </div>
        </div>
    </div>
</footer>

</main>
    
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    
    <!-- Custom JS -->
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/main.js"></script>
</body>
</html>