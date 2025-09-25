<?php

//define( 'DEBORA_URL', 'https://deboragarofalo.com/');
define( 'DEBORA_URL', 'http://localhost/teclab-wp/');

// Custom classes for css and js /
add_filter( 'body_class','teclab_body_class' );
function teclab_body_class( $classes ) {

    if ( is_page_template( 'front-page.php' ) ) {
        $classes[] = 'home';
    } 

    if ( is_page_template( 'page-projetos-especiais.php' ) ) {
        $classes[] = 'projetos-especiais';
    } 
	
    if ( is_singular( 'projetos-especiais' ) ) {
        $classes[] = 'projetos-inner';
    }

    if ( is_page_template( 'page-trainers.php' ) ) {
        $classes[] = 'trainers internal';
    } 

    if ( is_page_template( 'page-contact.php' ) ) {
        $classes[] = 'contact internal';
    } 

    if ( is_home() ) {
        $classes[] = 'blog internal';
    }
   
  /*if ( is_single()) {
      $classes[] = 'internal';
  }*/

    return $classes;
}


function custom_excerpt_length( $length ) {
 return 20;
}

add_filter( 'excerpt_length', 'custom_excerpt_length');

//// Remove auto paragraph contact form 7
add_filter( 'wpcf7_autop_or_not', '__return_false' );


add_theme_support('post-thumbnails');

// //Remove p tags from the_content pages 
// function my_wp_content_function($content) {
//   return strip_tags($content,"<br><h2><ul><li>"); //add any tags here you want to preserve
// }
// add_filter('the_content', 'my_wp_content_function');

// Remove p tags the_excerpt
remove_filter('the_excerpt','wpautop');