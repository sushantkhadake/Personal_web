$(document).ready(function () {
    // typing animation
    (function ($) {
      $.fn.writeText = function (content) {
        var contentArray = content.split(""),
          current = 0,
          elem = this;
        setInterval(function () {
          if (current < contentArray.length) {
            elem.text(elem.text() + contentArray[current++]);
          }
        }, 80);
      };
    })(jQuery);
  
    // input text for typing animation
    $("#holder").writeText("WEB DESIGNER + FRONT-END DEVELOPER");
  
    // initialize wow.js
    new WOW().init();
  
    // Push the body and the nav over by 285px over
    var main = function () {
      $(".fa-bars").click(function () {
        $(".nav-screen").animate(
          {
            right: "0px"
          },
          200
        );
  
        $("body").animate(
          {
            right: "285px"
          },
          200
        );
      });
  
      // Then push them back */
      $(".fa-times").click(function () {
        $(".nav-screen").animate(
          {
            right: "-285px"
          },
          200
        );
  
        $("body").animate(
          {
            right: "0px"
          },
          200
        );
      });
  
      $(".nav-links a").click(function () {
        $(".nav-screen").animate(
          {
            right: "-285px"
          },
          500
        );
  
        $("body").animate(
          {
            right: "0px"
          },
          500
        );
      });
    };
  
    $(document).ready(main);
  
    // initiate full page scroll
  
    $("#fullpage").fullpage({
      scrollBar: true,
      responsiveWidth: 400,
      navigation: true,
      navigationTooltips: ["home", "about", "portfolio", "contact", "connect"],
      anchors: ["home", "about", "portfolio", "contact", "connect"],
      menu: "#myMenu",
      fitToSection: false,
  
      afterLoad: function (anchorLink, index) {
        var loadedSection = $(this);
  
        //using index
        if (index == 1) {
          /* add opacity to arrow */
          $(".fa-chevron-down").each(function () {
            $(this).css("opacity", "1");
          });
          $(".header-links a").each(function () {
            $(this).css("color", "white");
          });
          $(".header-links").css("background-color", "transparent");
        } else if (index != 1) {
          $(".header-links a").each(function () {
            $(this).css("color", "black");
          });
          $(".header-links").css("background-color", "white");
        }
  
        //using index
        if (index == 2) {
          /* animate skill bars */
          $(".skillbar").each(function () {
            $(this)
              .find(".skillbar-bar")
              .animate(
                {
                  width: $(this).attr("data-percent")
                },
                2500
              );
          });
        }
      }
    });
  
    // move section down one
    $(document).on("click", "#moveDown", function () {
      $.fn.fullpage.moveSectionDown();
    });
  
    // fullpage.js link navigation
    $(document).on("click", "#skills", function () {
      $.fn.fullpage.moveTo(2);
    });
  
    $(document).on("click", "#projects", function () {
      $.fn.fullpage.moveTo(3);
    });
  
    $(document).on("click", "#contact", function () {
      $.fn.fullpage.moveTo(4);
    });
  
    // smooth scrolling
    $(function () {
      $("a[href*=#]:not([href=#])").click(function () {
        if (
          location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          var target = $(this.hash);
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
            $("html,body").animate(
              {
                scrollTop: target.offset().top
              },
              700
            );
            return false;
          }
        }
      });
    });
  
    //ajax form
    $(function () {
      // Get the form.
      var form = $("#ajax-contact");
  
      // Get the messages div.
      var formMessages = $("#form-messages");
  
      // Set up an event listener for the contact form.
      $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
  
        // Serialize the form data.
        var formData = $(form).serialize();
  
        // Submit the form using AJAX.
        $.ajax({
          type: "POST",
          url: $(form).attr("action"),
          data: formData
        })
          .done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass("error");
            $(formMessages).addClass("success");
  
            // Set the message text.
            $(formMessages).text(response);
  
            // Clear the form.
            $("#name").val("");
            $("#email").val("");
            $("#message").val("");
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass("success");
            $(formMessages).addClass("error");
  
            // Set the message text.
            if (jqXHR.responseText !== "") {
              $(formMessages).text(jqXHR.responseText);
            } else {
              $(formMessages).text(
                "Oops! An error occurred and your message could not be sent."
              );
            }
          });
      });
    });
  
    // Smooth scrolling for navigation links
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
  
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress-bar');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if(barPosition < screenPosition) {
                bar.style.width = bar.parentElement.getAttribute('data-percent');
            }
        });
    }
  
    window.addEventListener('scroll', animateSkills);
  
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
  
    // Mobile navigation toggle
    const navToggle = document.querySelector('.fa-bars');
    const navScreen = document.querySelector('.nav-screen');
    const navClose = document.querySelector('.fa-times');
  
    if(navToggle && navScreen && navClose) {
        navToggle.addEventListener('click', () => {
            navScreen.style.right = '0';
        });
  
        navClose.addEventListener('click', () => {
            navScreen.style.right = '-285px';
        });
    }
  
    // Progress bar animation trigger
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress-bar');
  
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.parentElement.getAttribute('data-progress') || bar.style.width;
            bar.style.width = width;
        });
    }
  
    // Intersection Observer for skills section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
  
    if (skillsSection) {
        observer.observe(skillsSection);
    }
  
    // Certificates scroll effect
    const certificatesScroll = document.querySelector('.certificates-scroll');
    const wideCards = document.querySelectorAll('.wide-card');
  
    function updateCardSizes() {
        if (!certificatesScroll) return;
  
        const containerCenter = certificatesScroll.scrollLeft + certificatesScroll.offsetWidth / 2;
  
        wideCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(containerCenter - cardCenter);
  
            // Normalize distance to a 0-1 range, where 0 is center, 1 is edge
            // Max distance could be half of the scrollable width + card width
            const maxDistance = certificatesScroll.offsetWidth / 2 + card.offsetWidth / 2;
            const normalizedDistance = Math.min(1, distance / maxDistance);
  
            // Scale from 1 (center) down to 0.6 (-40% smaller) for edges
            const scale = 1 - (0.4 * normalizedDistance);
            // Opacity from 1 (center) down to 0.7 for edges
            const opacity = 1 - (0.3 * normalizedDistance);
  
            card.style.transform = `scale(${scale})`;
            card.style.opacity = opacity;
        });
    }
  
    // Initial update and on scroll
    if (certificatesScroll) {
        certificatesScroll.addEventListener('scroll', updateCardSizes);
        // A slight delay might be needed if cards load after scroll position is set
        window.addEventListener('load', updateCardSizes); 
        // Or call directly if confident about DOM readiness
        updateCardSizes();
    }
  
    // Portfolio cards scroll effect
    const portfolioCardsScroll = document.querySelector('.portfolio-cards-scroll');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
  
    function updatePortfolioCardSizes() {
        if (!portfolioCardsScroll) return;
  
        const containerCenter = portfolioCardsScroll.scrollLeft + portfolioCardsScroll.offsetWidth / 2;
  
        portfolioCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(containerCenter - cardCenter);
  
            // Normalize distance to a 0-1 range, where 0 is center, 1 is edge
            const maxDistance = portfolioCardsScroll.offsetWidth / 2 + card.offsetWidth / 2;
            const normalizedDistance = Math.min(1, distance / maxDistance);
  
            // Scale from 1 (center) down to 0.6 (-40% smaller) for edges
            const scale = 1 - (0.4 * normalizedDistance);
            // Opacity from 1 (center) down to 0.7 for edges
            const opacity = 1 - (0.3 * normalizedDistance);
  
            card.style.transform = `scale(${scale})`;
            card.style.opacity = opacity;
        });
    }
  
    // Initial update and on scroll for portfolio cards
    if (portfolioCardsScroll) {
        portfolioCardsScroll.addEventListener('scroll', updatePortfolioCardSizes);
        window.addEventListener('load', updatePortfolioCardSizes); 
        updatePortfolioCardSizes();
    }
  });
  