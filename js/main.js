/* Bootstrap 4 depende de jQuery. Los datos se insertan como texto, no como HTML. */
(function ($) {
  'use strict';
  var products = {
    laptop: { name: 'Laptop profesional', price: 'L 24,999', image: 'laptop.svg', description: 'Un equipo portátil para organizar tus proyectos, preparar presentaciones y estudiar desde cualquier lugar.', features: ['Categoría: computación', 'Uso sugerido: estudio y productividad', 'Formato portátil con teclado integrado'] },
    teclado: { name: 'Teclado mecánico RGB', price: 'L 1,799', image: 'teclado.svg', description: 'Haz de tu escritorio un espacio propio con un teclado mecánico de iluminación RGB para escribir y jugar.', features: ['Categoría: accesorios', 'Mecanismo de teclas mecánicas', 'Iluminación RGB'] },
    mouse: { name: 'Mouse inalámbrico', price: 'L 899', image: 'mouse.svg', description: 'Un accesorio inalámbrico para navegar, trabajar con documentos y mantener tu escritorio organizado.', features: ['Categoría: accesorios', 'Conexión inalámbrica', 'Diseño para uso cotidiano'] },
    audifonos: { name: 'Audífonos Bluetooth', price: 'L 2,499', image: 'audifonos.svg', description: 'Escucha tus contenidos favoritos y acompaña tus actividades con audífonos Bluetooth de diadema.', features: ['Categoría: accesorios', 'Conectividad Bluetooth', 'Formato de diadema'] },
    monitor: { name: 'Monitor Full HD', price: 'L 5,999', image: 'monitor.svg', description: 'Amplía tu espacio visual para consultar documentos, seguir tus clases y disfrutar contenido multimedia.', features: ['Categoría: computación', 'Resolución Full HD: 1920 × 1080', 'Uso sugerido: escritorio y multimedia'] },
    reloj: { name: 'Smartwatch inteligente', price: 'L 3,499', image: 'reloj.svg', description: 'Un reloj inteligente pensado para acompañar tu rutina y consultar información desde tu muñeca.', features: ['Categoría: smart life', 'Formato de reloj de pulsera', 'Compatibilidad y funciones sujetas al modelo'] }
  };

  $('#productModal').on('show.bs.modal', function (event) {
    var product = products[$(event.relatedTarget).data('product')];
    if (!product) { event.preventDefault(); return; }
    $('#modalProductTitle').text(product.name);
    $('#modalProductPrice').text(product.price);
    $('#modalProductDescription').text(product.description);
    $('#modalProductImage').attr({ src: 'assets/images/' + product.image, alt: 'Ilustración de ' + product.name.toLowerCase() });
    var list = $('#modalProductFeatures').empty();
    product.features.forEach(function (feature) { $('<li>').text(feature).appendTo(list); });
  });

  $('.filter-button').on('click', function () {
    var category = $(this).data('filter');
    $('.filter-button').removeClass('active').attr('aria-pressed', 'false');
    $(this).addClass('active').attr('aria-pressed', 'true');
    var count = 0;
    $('.product-column').each(function () {
      var visible = category === 'todos' || $(this).data('category') === category;
      this.hidden = !visible;
      if (visible) { count += 1; }
    });
    $('#filterStatus').text('Mostrando ' + count + (count === 1 ? ' producto' : ' productos'));
  });

  $('#socialDemo').on('show.bs.modal', function (event) {
    var channel = $(event.relatedTarget).data('social');
    $('#socialTitle').text(channel + ' · enlace demostrativo');
    $('#socialDescription').text('Este enlace de ' + channel + ' es una demostración académica. TecnoLand no tiene un perfil comercial asociado a este proyecto.');
  });

  // Al elegir una sección en móvil, se cierra el menú y se enfoca su destino.
  $('#mainNavigation a[href^="#"]').on('click', function () {
    var menu = $('#mainNavigation');
    if (menu.hasClass('show') || menu.hasClass('collapsing')) {
      var target = document.querySelector(this.getAttribute('href'));
      menu.one('hidden.bs.collapse', function () {
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        }
      });
      if (menu.hasClass('collapsing')) {
        menu.one('shown.bs.collapse', function () { menu.collapse('hide'); });
      } else {
        menu.collapse('hide');
      }
    }
  });
})(jQuery);
