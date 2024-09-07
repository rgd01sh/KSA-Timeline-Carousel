document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = Array.from(slider.children);
  const prevButton = document.querySelector(".nav .prev");
  const nextButton = document.querySelector(".nav .next");
  const expandedView = document.querySelector(".expanded-view");
  const closeBtn = document.querySelector(".expanded-content .close-btn");
  const contentContainer = document.querySelector(
    ".expanded-content .content-container"
  );
  const progressBar = document.querySelector(".progress-bar");
  const progressBarSpan = progressBar.querySelector("span");

  let currentIndex = 0;
  let startX = 0;
  let endX = 0;
  let isDragging = false;
  const swipeThreshold = 30;
  const scrollDebounceDelay = 100;

  // Detailed content for each slide
  const detailedContent = {
    0: `<h2>The 1930s</h2>
        <div>
            <img src="img/1932.jpg" alt="Image for 1932">
            <p><strong>In 1932</strong> The Kingdom of Saudi Arabia is officially established by King Abdulaziz Al Saud. This monumental event marks the unification of the various regions of the Arabian Peninsula under a single nation-state, bringing together disparate tribes and territories into a cohesive political entity. King Abdulaziz’s leadership and vision lay the foundation for the modern state of Saudi Arabia.</p>
        </div>
        <div>
            <img src="img/1938.jpg" alt="Image for 1938">
            <p><strong>In 1938</strong> The discovery of oil in the Eastern Province of Saudi Arabia transforms the nation’s economic landscape. This discovery, made by the California Arabian Standard Oil Company (later known as Aramco), marks the beginning of Saudi Arabia’s journey to becoming one of the world’s leading oil producers. The newfound wealth from oil exports significantly boosts the country’s economy and sets the stage for rapid modernization and development.</p>
        </div>`,
    1: `<h2>The 1940s</h2>
        <div>
            <img src="img/1940.jpg" alt="Image for 1940">
            <p><strong>In 1940</strong> The Saudi Arabian Monetary Authority (SAMA) is established, serving as the central bank of the Kingdom. This institution plays a crucial role in managing the country’s monetary policy and financial stability.</p>
        </div>
        <div>
            <img src="img/1941.jpg" alt="Image for 1941">
            <p><strong>In 1941</strong> Saudi Arabia begins to export oil, marking the start of its transformation into a major global oil producer.</p>
        </div>
        <div>
            <img src="img/1945.jpg" alt="Image for 1945">
            <p><strong>In 1945</strong> King Abdulaziz Al Saud meets with U.S. President Franklin D. Roosevelt aboard the USS Quincy. This meeting lays the foundation for the strong bilateral relationship between Saudi Arabia and the United States.</p>
        </div>
        <div>
            <img src="img/1947.jpg" alt="Image for 1947">
            <p><strong>In 1947</strong> The establishment of the Saudi Arabian Airlines (now known as Saudia), which becomes the national carrier and significantly enhances the Kingdom’s connectivity with the rest of the world.</p>
        </div>
        <div>
            <img src="img/1948.jpg" alt="Image for 1948">
            <p><strong>In 1948</strong> Saudi Arabia participates in the Arab-Israeli War, supporting the Arab coalition against the newly established state of Israel.</p>
        </div>`,
    2: `<h2>The 1950s</h2>
        <div>
            <img src="img/1953.jpg" alt="Image for 1953">
            <p><strong>In 1953</strong> The death of King Abdulaziz leads to the ascension of his son, King Saud, to the throne. King Saud’s reign is characterized by efforts to continue his father’s legacy of modernization and development. However, his tenure also faces challenges, including internal political struggles and economic difficulties.</p>
        </div>
        <div>
            <img src="img/1960.jpg" alt="Image for 1960">
            <p><strong>In 1960</strong> Saudi Arabia becomes a founding member of the Organization of the Petroleum Exporting Countries (OPEC). This strategic move positions the country as a key player in the global oil market, allowing it to influence oil prices and production levels. OPEC’s formation aims to coordinate and unify petroleum policies among member countries, ensuring fair and stable prices for petroleum producers.</p>
        </div>`,
    3: `<h2>The 1960s</h2>
        <div>
            <img src="img/1964.jpg" alt="Image for 1964">
            <p><strong>In 1964</strong> King Saud is deposed, and King Faisal ascends to the throne. King Faisal’s reign is marked by significant reforms and modernization efforts. He implements policies to improve education, healthcare, and infrastructure, and he works to strengthen the country’s economy. King Faisal also plays a crucial role in enhancing Saudi Arabia’s international relations and positioning the country as a leader in the Arab world.</p>
        </div>
        <div>
            <img src="img/1967.jpg" alt="Image for 1967">
            <p><strong>In 1967</strong> Saudi Arabia participates in the Arab-Israeli Six-Day War, aligning with other Arab nations in the conflict against Israel. The war has significant geopolitical implications for the region and impacts Saudi Arabia’s foreign policy and military strategy.</p>
        </div>`,
    4: `<h2>The 1970s</h2>
        <div>
            <img src="img/1973.jpg" alt="Image for 1973">
            <p><strong>In 1973</strong> Saudi Arabia leads an oil embargo against countries perceived as supporting Israel during the Yom Kippur War. This action causes a global oil crisis, leading to skyrocketing oil prices and highlighting the strategic importance of Saudi oil. The embargo demonstrates Saudi Arabia’s influence in global politics and its ability to leverage its oil resources for political purposes.</p>
        </div>
        <div>
            <img src="img/1975.jpg" alt="Image for 1975">
            <p><strong>In 1975</strong> The assassination of King Faisal shocks the nation and the world. King Khalid ascends to the throne, continuing the policies of modernization and development initiated by his predecessors. King Khalid’s reign sees further economic growth and the expansion of infrastructure projects.</p>
        </div>`,
    5: `<h2>The 1980s</h2>
        <div>
            <img src="img/1980.jpg" alt="Image for 1980">
            <p><strong>In 1980</strong> Saudi Arabia gains full control of Aramco, the national oil company. This move consolidates the country’s control over its oil resources and revenues, allowing for greater economic independence and strategic planning. The nationalization of Aramco marks a significant milestone in Saudi Arabia’s economic history.</p>
        </div>
        <div>
            <img src="img/1981.jpg" alt="Image for 1981">
            <p><strong>In 1981</strong> Saudi Arabia becomes a founding member of the Gulf Cooperation Council (GCC), an organization aimed at fostering economic, political, and security cooperation among its member states. The GCC plays a crucial role in regional stability and development, and Saudi Arabia’s leadership within the organization underscores its influence in the Gulf region.</p>
        </div>`,
    6: `<h2>The 1990s</h2>
        <div>
            <img src="img/1990-1991.jpg" alt="Image for 1990-1991">
            <p><strong>In 1990 to 1991</strong> Saudi Arabia plays a key role in the Gulf War, providing critical support to the coalition forces led by the United States to liberate Kuwait from Iraqi occupation. The war highlights Saudi Arabia’s strategic importance and its role as a key ally in regional security.</p>
        </div>
        <div>
            <img src="img/1992.jpg" alt="Image for 1992">
            <p><strong>In 1992</strong> King Fahd introduces the Basic Law of Governance, which outlines the framework for the country’s political and administrative structure. The Basic Law emphasizes the principles of Islamic governance and sets the foundation for the modern Saudi state.</p>
        </div>`,
    7: `<h2>The 2000s</h2>
    <img src="img/2001.jpg" alt="Image for 2001">
    <p><strong>In 2001</strong> Saudi Arabia issues ID cards to women for the first time, marking a significant step towards gender equality and women’s rights.</p>
</div>
<div>
    <img src="img/2003.jpg" alt="Image for 2003">
    <p><strong>In 2003</strong> The Saudi government launches the King Abdullah Scholarship Program, which provides funding for Saudi students to study abroad. This initiative aims to enhance the educational and professional skills of Saudi citizens.</p>
</div>
<div>
    <img src="img/2005.jpg" alt="Image for 2005">
    <p><strong>In 2005</strong> King Abdullah ascends to the throne and initiates a series of economic, social, and educational reforms. His reign is marked by efforts to modernize the country and improve the quality of life for its citizens.</p>
</div>
<div>
    <img src="img/2007.jpg" alt="Image for 2007">
    <p><strong>In 2007</strong> The establishment of the King Abdullah University of Science and Technology (KAUST), a graduate-level research university aimed at advancing scientific and technological research in the Kingdom.</p>
</div>
<div>
    <img src="img/2008.jpg" alt="Image for 2008">
    <p><strong>In 2008</strong> Saudi Arabia hosts the Jeddah Economic Forum, which brings together global leaders and experts to discuss economic development and investment opportunities in the region.</p>
</div>
<div>
    <img src="img/2009.jpg" alt="Image for 2009">
    <p><strong>In 2009</strong> The inauguration of the King Abdullah Financial District (KAFD) in Riyadh, designed to be a major financial hub in the Middle East, promoting economic growth and diversification.</p>
</div>`,
    8: `<h2>The 2010s</h2>
        <div>
        <img src="img/2011.jpg" alt="Image for 2011">
        <p><strong>In 2011</strong> Saudi Arabia sends troops to Bahrain during the Arab Spring to support the Bahraini government in maintaining stability. This action underscores Saudi Arabia’s commitment to regional security and its role as a key player in Gulf politics.</p>
    </div>
    <div>
        <img src="img/2012.jpg" alt="Image for 2012">
        <p><strong>In 2012</strong> The Saudi government launches the National Transformation Program (NTP) as part of Vision 2030. The NTP aims to diversify the economy, improve government efficiency, and enhance the quality of life for citizens.</p>
    </div>
    <div>
        <img src="img/2013.jpg" alt="Image for 2013">
        <p><strong>In 2013</strong> Saudi Arabia inaugurates the King Abdullah Port, one of the largest ports in the Middle East, enhancing the country’s logistics and trade capabilities.</p>
    </div>
    <div>
        <img src="img/2015.jpg" alt="Image for 2015">
        <p><strong>In 2015</strong> King Salman ascends to the throne, and Mohammed bin Salman becomes Crown Prince. The new leadership introduces Vision 2030, an ambitious plan to diversify the economy, reduce dependence on oil, and implement wide-ranging social and economic reforms.</p>
    </div>
    <div>
        <img src="img/2016.jpg" alt="Image for 2016">
        <p><strong>In 2016</strong> The launch of Vision 2030 marks a transformative period for Saudi Arabia. The vision focuses on three main pillars: a vibrant society, a thriving economy, and an ambitious nation. It includes initiatives to promote tourism, entertainment, and cultural activities.</p>
    </div>
    <div>
        <img src="img/2017.jpg" alt="Image for 2017">
        <p><strong>In 2017</strong> Saudi Arabia lifts the ban on cinemas, allowing public movie screenings for the first time in over 35 years. This move is part of broader social reforms aimed at increasing entertainment options and improving the quality of life.</p>
    </div>
    <div>
        <img src="img/2018.jpg" alt="Image for 2018">
        <p><strong>In 2018</strong> Saudi Arabia allows women to drive for the first time, a landmark decision that symbolizes the country’s ongoing efforts to improve women’s rights and promote social change.</p>
    </div>
    <div>
        <img src="img/2019.jpg" alt="Image for 2019">
        <p><strong>In 2019</strong> The Saudi government launches the Saudi Space Commission to develop the country’s space capabilities and promote scientific research and innovation.</p>
    </div>`,
    9: `<h2>The 2020s</h2>
        <div>
        <img src="img/2020.jpg" alt="Image for 2020">
        <p><strong>In 2020</strong> Saudi Arabia hosts the G20 summit virtually due to the COVID-19 pandemic. This event highlights Saudi Arabia’s role in international diplomacy and its ability to adapt to global challenges.</p>
    </div>
    <div>
        <img src="img/2020.jpg" alt="Image for 2020">
        <p><strong>In 2020</strong> The launch of the Saudi Green Initiative aims to combat climate change and promote environmental sustainability. The initiative includes ambitious plans for renewable energy, reforestation, and reducing carbon emissions.</p>
    </div>
    <div>
        <img src="img/2020.jpg" alt="Image for 2020">
        <p><strong>In 2020</strong> Saudi Arabia assumes the G20 Presidency and ranks third among G20 countries in reducing carbon emissions from fuel consumption. The Kingdom also ranks number one for digital competitiveness within the G20.</p>
    </div>
    <div>
        <img src="img/2020.jpg" alt="Image for 2020">
        <p><strong>In 2020</strong> The Women Empowerment Initiative is highlighted during Saudi Arabia’s G20 Presidency, marking the first time G20 policy discussions acknowledge the growing contribution of culture in forging more sustainable societies and economies.</p>
    </div>
    <div>
        <img src="img/2021.jpg" alt="Image for 2021">
        <p><strong>In 2021</strong> The launch of the National Transformation Program 2020 supports transparency and aims to achieve the Saudi Vision 2030, creating significant positive transformations at economic and social levels.</p>
    </div>
    <div>
        <img src="img/2021.jpg" alt="Image for 2021">
        <p><strong>In 2021</strong> The Fiscal Balance Program 2020 is approved to achieve fiscal balance and create a financial planning mechanism for the sustainability of the Kingdom’s fiscal position.</p>
    </div>
    <div>
        <img src="img/2021.jpg" alt="Image for 2021">
        <p><strong>In 2021</strong> Saudi Arabia founds the OPEC Plus grouping of nations, achieving the largest reduction in oil output in market history, contributing to restoring stability in global markets severely impacted by the coronavirus pandemic.</p>
    </div>
    <div>
        <img src="img/2023.jpg" alt="Image for 2023">
        <p><strong>In 2023</strong> The announcement of The Line, a futuristic city project as part of the NEOM development, showcases Saudi Arabia’s vision for innovative urban planning and sustainable living. The project aims to create a linear city with zero cars, zero streets, and zero carbon emissions.</p>
    </div>`,
    10: `<h2>The 2024</h2>
        <div>
            <img src="img/2024-vision.jpg" alt="Image for 2024">
            <p><strong>2024:</strong> Significant progress on Vision 2030 initiatives.</p>
        </div>
        <div>
            <img src="img/2024-tourism.jpg" alt="Image for 2024">
            <p><strong>2024:</strong> Saudi Arabia welcomes 106 million visitors, including 27.4 million international tourists.</p>
        </div>
        <div>
            <img src="img/2024-heritage.jpg" alt="Image for 2024">
            <p><strong>2024:</strong> The number of UNESCO-listed Saudi heritage sites climbs to seven.</p>
        </div>
        <div>
            <img src="img/2024-expo.jpg" alt="Image for 2024">
            <p><strong>2024:</strong> Riyadh secures the hosting rights for Expo 2030.</p>
        </div>
        <div>
            <img src="img/2024-pif.jpg" alt="Image for 2024">
            <p><strong>2024:</strong> The Public Investment Fund (PIF) establishes several new companies.</p>
        </div>
        <div>
            <img src="img/2024-summits.jpg" alt="Image for 2024">
            <p><strong>2024:</strong> Saudi Arabia hosts numerous summits and conferences.</p>
        </div>
        <div>
            <img src="img/2024-sports.jpg" alt="Image for 2024">
            <p><strong>2024:</strong> Saudi athletes achieve notable success at the Paris 2024 Olympics.</p>
        </div>`,
  };

  const updateCarousel = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translate3d(-${
      currentIndex * slideWidth
    }px, 0, 0)`;
    updateProgressBar();
    updateButtonVisibility();
  };

  const updateProgressBar = () => {
    const totalSlides = slides.length;
    const progress = ((currentIndex + 1) / totalSlides) * 100;
    progressBarSpan.style.width = `${progress}%`;
  };

  const updateButtonVisibility = () => {
    prevButton.style.display = currentIndex === 0 ? "none" : "block";
    nextButton.style.display =
      currentIndex === slides.length - 1 ? "none" : "block";
  };

  const showNextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  };

  const showPrevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  };

  const openExpandedView = (title, description, imageUrl, detailedHtml) => {
    contentContainer.innerHTML = `

      ${detailedHtml}
    `;
    expandedView.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent body scrolling
  };

  const closeExpandedView = () => {
    expandedView.style.display = "none";
    document.body.style.overflow = ""; // Restore body scrolling
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSwipe = (start, end) => {
    if (Math.abs(start - end) > swipeThreshold) {
      if (start > end) {
        showNextSlide();
      } else {
        showPrevSlide();
      }
    }
  };

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      showNextSlide();
    } else {
      showPrevSlide();
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, scrollDebounceDelay);

  nextButton.addEventListener("click", showNextSlide);
  prevButton.addEventListener("click", showPrevSlide);

  slides.forEach((slide, index) => {
    slide.querySelector(".more").addEventListener("click", (e) => {
      e.stopPropagation();
      const title = slide.querySelector(".title").textContent;
      const description = slide.querySelector(".description").innerHTML;
      const visual = slide.querySelector(".visual");
      const backgroundImage = getComputedStyle(visual).backgroundImage.slice(
        5,
        -2
      ); // Clean URL

      // Retrieve detailed content
      const detailedHtml =
        detailedContent[index] || `<h2>${title}</h2><p>${description}</p>`;

      openExpandedView(title, description, backgroundImage, detailedHtml);
    });
  });

  closeBtn.addEventListener("click", closeExpandedView);

  slider.addEventListener("mousedown", (e) => {
    startX = e.pageX;
    isDragging = true;
    progressBar.classList.add("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    endX = e.pageX;
  });

  slider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    endX = e.pageX;
    handleSwipe(startX, endX);
    isDragging = false;
    progressBar.classList.remove("active");
  });

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    isDragging = true;
    progressBar.classList.add("active");
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    endX = e.touches[0].pageX;
  });

  slider.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    endX = e.changedTouches[0].pageX;
    handleSwipe(startX, endX);
    isDragging = false;
    progressBar.classList.remove("active");
  });

  slider.addEventListener("wheel", debouncedHandleScroll);

  // Initial update
  updateCarousel();
});
