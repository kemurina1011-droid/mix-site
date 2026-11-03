import {
  getHomeEligibleWorksByType,
} from "../data/works.js";


const HOME_FULL_COUNT = 4;
const HOME_SHORT_COUNT = 6;


/* =========================================================
   Random
   Fisher-Yates shuffle
   ========================================================= */

function shuffle(items) {
  const array = [...items];

  for (
    let i = array.length - 1;
    i > 0;
    i -= 1
  ) {
    const j = Math.floor(
      Math.random() *
        (i + 1)
    );

    [
      array[i],
      array[j],
    ] = [
      array[j],
      array[i],
    ];
  }

  return array;
}


/*
 * homeEligible:true の中から
 * ランダムで指定件数を取得
 */
function getRandomHomeWorks(
  type,
  count
) {
  const eligibleWorks =
    getHomeEligibleWorksByType(
      type
    );

  return shuffle(
    eligibleWorks
  ).slice(
    0,
    count
  );
}


/* =========================================================
   DOM Utility
   ========================================================= */

function createElement(
  tag,
  className = ""
) {
  const element =
    document.createElement(tag);

  if (className) {
    element.className =
      className;
  }

  return element;
}


/* =========================================================
   Works body
   ========================================================= */

function createWorksBody(work) {
  const body =
    createElement(
      "div",
      "works-body"
    );

  const title =
    createElement("h3");

  title.textContent =
    work.title;

  const type =
    createElement("p");

  type.textContent =
    work.type === "full"
      ? "Full"
      : "Short";

  body.appendChild(title);
  body.appendChild(type);

  return body;
}


/* =========================================================
   Full card
   ========================================================= */

function createFullCard(work) {
  const article =
    createElement(
      "article",
      "works-card"
    );

  article.dataset.workId =
    work.id;


  const video =
    createElement(
      "div",
      "works-video full-video"
    );


  const button =
    createElement(
      "button",
      "full-video-facade"
    );

  button.type =
    "button";

  button.dataset.videoId =
    work.videoId;

  button.dataset.videoTitle =
    work.title;

  button.setAttribute(
    "aria-label",
    `${work.title}を再生`
  );


  const image =
    createElement("img");

  image.src =
    `https://i.ytimg.com/vi/${work.videoId}/maxresdefault.jpg`;

  image.alt =
    work.title;

  image.loading =
    "lazy";


  /*
   * maxresdefaultが存在しない動画は
   * hqdefaultへ自動フォールバック
   */
  image.addEventListener(
    "error",
    () => {
      image.src =
        `https://i.ytimg.com/vi/${work.videoId}/hqdefault.jpg`;
    },
    {
      once: true,
    }
  );


  button.appendChild(image);

  video.appendChild(button);

  article.appendChild(video);

  article.appendChild(
    createWorksBody(work)
  );

  return article;
}


/* =========================================================
   Short card
   ========================================================= */

function createShortCard(work) {
  const article =
    createElement(
      "article",
      "works-card short-card"
    );

  article.dataset.workId =
    work.id;


  const link =
    createElement(
      "a",
      "short-thumb-link"
    );

  link.href =
    `https://www.youtube.com/shorts/${work.videoId}`;

  link.target =
    "_blank";

  link.rel =
    "noopener noreferrer";

  link.setAttribute(
    "aria-label",
    `${work.title}をYouTubeで見る`
  );


  const image =
    createElement(
      "img",
      "short-thumb-image"
    );

  image.src =
    `https://i.ytimg.com/vi/${work.videoId}/maxresdefault.jpg`;

  image.alt =
    work.title;

  image.loading =
    "lazy";


  image.addEventListener(
    "error",
    () => {
      image.src =
        `https://i.ytimg.com/vi/${work.videoId}/hqdefault.jpg`;
    },
    {
      once: true,
    }
  );


  const playBadge =
    createElement(
      "span",
      "short-play-badge"
    );

  playBadge.setAttribute(
    "aria-hidden",
    "true"
  );


  link.appendChild(image);

  link.appendChild(
    playBadge
  );

  article.appendChild(link);

  article.appendChild(
    createWorksBody(work)
  );

  return article;
}


/* =========================================================
   Empty state
   ========================================================= */

function createEmptyState(type) {
  const empty =
    createElement(
      "div",
      "works-empty"
    );

  empty.textContent =
    type === "full"
      ? "トップページに表示するFull作品が設定されていません。"
      : "トップページに表示するShort作品が設定されていません。";

  return empty;
}


/* =========================================================
   Render
   ========================================================= */

function renderWorks(
  container,
  items,
  type
) {
  if (!container) {
    return;
  }

  container.innerHTML =
    "";


  if (
    items.length === 0
  ) {
    container.appendChild(
      createEmptyState(
        type
      )
    );

    return;
  }


  items.forEach(
    (work) => {
      const card =
        work.type ===
        "full"
          ? createFullCard(
              work
            )
          : createShortCard(
              work
            );

      container.appendChild(
        card
      );
    }
  );
}


/* =========================================================
   Scroll buttons
   ========================================================= */

function setupScrollButtons(
  scrollElement,
  previousButton,
  nextButton
) {
  if (
    !scrollElement ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }


  const getScrollAmount =
    () => {
      const firstCard =
        scrollElement.querySelector(
          ".works-card"
        );

      if (!firstCard) {
        return 420;
      }

      const cardWidth =
        firstCard
          .getBoundingClientRect()
          .width;

      return (
        cardWidth +
        16
      );
    };


  previousButton.addEventListener(
    "click",
    () => {
      scrollElement.scrollBy(
        {
          left:
            -getScrollAmount(),

          behavior:
            "smooth",
        }
      );
    }
  );


  nextButton.addEventListener(
    "click",
    () => {
      scrollElement.scrollBy(
        {
          left:
            getScrollAmount(),

          behavior:
            "smooth",
        }
      );
    }
  );
}


/* =========================================================
   Tabs
   ========================================================= */

function setupTabs() {
  const tabs =
    Array.from(
      document.querySelectorAll(
        "[data-home-works-tab]"
      )
    );


  const panels =
    Array.from(
      document.querySelectorAll(
        "[data-home-works-panel]"
      )
    );


  tabs.forEach(
    (tab) => {
      tab.addEventListener(
        "click",
        () => {
          const target =
            tab.dataset
              .homeWorksTab;

          if (!target) {
            return;
          }


          tabs.forEach(
            (item) => {
              const isActive =
                item === tab;

              item.classList.toggle(
                "is-active",
                isActive
              );

              item.setAttribute(
                "aria-selected",
                isActive
                  ? "true"
                  : "false"
              );
            }
          );


          panels.forEach(
            (panel) => {
              panel.classList.toggle(
                "is-active",
                panel.dataset
                  .homeWorksPanel ===
                  target
              );
            }
          );
        }
      );
    }
  );
}


/* =========================================================
   Full video playback
   ========================================================= */

function setupFullVideoPlayback() {
  document.addEventListener(
    "click",
    (event) => {
      const target =
        event.target;

      if (
        !(
          target instanceof
          Element
        )
      ) {
        return;
      }


      const facade =
        target.closest(
          ".full-video-facade"
        );


      if (
        !(
          facade instanceof
          HTMLButtonElement
        )
      ) {
        return;
      }


      /*
       * /works側など別スクリプトが扱う
       * facadeには干渉しないため、
       * HOME実績内だけ対象にする。
       */
      const homeWorksArea =
        facade.closest(
          "#works"
        );

      if (!homeWorksArea) {
        return;
      }


      const videoId =
        facade.dataset
          .videoId;

      const title =
        facade.dataset
          .videoTitle ||
        "YouTube動画";


      if (!videoId) {
        return;
      }


      const iframe =
        document.createElement(
          "iframe"
        );


      iframe.src =
        `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`;


      iframe.title =
        title;


      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


      iframe.allowFullscreen =
        true;


      iframe.loading =
        "lazy";


      facade.replaceWith(
        iframe
      );
    }
  );
}


/* =========================================================
   Main
   ========================================================= */

export function initHomeWorks() {
  const fullContainer =
    document.getElementById(
      "homeFullWorks"
    );


  const shortContainer =
    document.getElementById(
      "homeShortWorks"
    );


  /*
   * HOME v2が存在しないページでは
   * 何もしない。
   */
  if (
    !fullContainer &&
    !shortContainer
  ) {
    return;
  }


  /*
   * TOP表示対象のみから抽選
   */
  const fullWorks =
    getRandomHomeWorks(
      "full",
      HOME_FULL_COUNT
    );


  const shortWorks =
    getRandomHomeWorks(
      "short",
      HOME_SHORT_COUNT
    );


  renderWorks(
    fullContainer,
    fullWorks,
    "full"
  );


  renderWorks(
    shortContainer,
    shortWorks,
    "short"
  );


  setupTabs();

  setupFullVideoPlayback();


  setupScrollButtons(
    fullContainer,

    document.getElementById(
      "homeFullPrev"
    ),

    document.getElementById(
      "homeFullNext"
    )
  );


  setupScrollButtons(
    shortContainer,

    document.getElementById(
      "homeShortPrev"
    ),

    document.getElementById(
      "homeShortNext"
    )
  );
}