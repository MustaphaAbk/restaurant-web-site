/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/
// by: George Olaru https://dribbble.com/shots/1560982-Rosa-Restaurant-Website/attachments/239212

$(document).ready(function() {

    $('button').on('click', function() {
      if ($(this).hasClass('nav-button')) {
        $('nav div').addClass('show');
      } else if ($(this).hasClass('exit-menu')) {
        $('nav div').removeClass('show');
      } else if ($(this).hasClass('to-top')) {
        $('html, body').animate({scrollTop: 0}, 'slow');
      }
    });
  
    AOS.init({
      duration: 1800,
      easing: 'ease'
    });
  
    Particles.init({
      selector: '.background',
      color: ['#000000'],
      connectParticles: true,
      responsive: [
        {
          breakpoint: 768,
          options: {
            color: ['#faebd7', '#03dac6', '#ff0266'],
            maxParticles: 43,
            connectParticles: false
          }
        }
      ]
    });
    
    new NavigationPage();
  });
  
  class NavigationPage {
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      this.lastScroll = 0;
  
      this.initEventListeners();
    }
  
    initEventListeners() {
      $(".nav-tab").on('click', (event) => this.onTabClick(event, $(event.currentTarget)));
      $(window).on('scroll', () => this.onScroll());
      $(window).on('resize', () => this.onResize());
    }
  
    onTabClick(event, element) {
      event.preventDefault();
      let scrollTop = $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
      $("html, body").animate({scrollTop: scrollTop}, 600);
    }
  
    onScroll() {
      this.checkHeaderPosition();
      this.findCurrentTabSelector();
      this.lastScroll = $(window).scrollTop();
    }
  
    onResize() {
      if (this.currentId) {
        this.setSliderCss();
      }
    }
  
    checkHeaderPosition() {
      const headerHeight = 75;
      const scrollTop = $(window).scrollTop();
  
      $(".nav-container").toggleClass('nav-container--scrolled', scrollTop > headerHeight);
  
      let offset = $(".nav").offset().top + $(".nav").height() - this.tabContainerHeight - headerHeight;
  
      if (scrollTop > this.lastScroll && scrollTop > offset) {
        $(".nav-container").addClass('nav-container--move-up').removeClass('nav-container--top-first').addClass('nav-container--top-second');
      } else if (scrollTop < this.lastScroll && scrollTop > offset) {
        $(".nav-container").removeClass('nav-container--move-up nav-container--top-second').addClass('nav-container--top-first');
      } else {
        $(".nav-container").removeClass('nav-container--move-up nav-container--top-first nav-container--top-second');
      }
    }
  
    findCurrentTabSelector() {
      let newCurrentId;
      let newCurrentTab;
      
      $(".nav-tab").each((_, element) => {
        let id = $(element).attr("href");
        let offsetTop = $(id).offset().top - this.tabContainerHeight;
        let offsetBottom = $(id).offset().top + $(id).height() - this.tabContainerHeight;
  
        if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
          newCurrentId = id;
          newCurrentTab = $(element);
        }
      });
  
      if (this.currentId !== newCurrentId) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }
  
    setSliderCss() {
      let width = this.currentTab ? this.currentTab.css("width") : 0;
      let left = this.currentTab ? this.currentTab.offset().left : 0;
  
      $(".nav-tab-slider").css({ width, left });
    }
  }
  
  /* Credit and Thanks:
  Matrix - Particles.js;
  SliderJS - Ettrics;
  Design - Sara Mazal Web;
  Fonts - Google Fonts
  */
  