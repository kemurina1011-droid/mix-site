import {
  getHomeEligibleWorksByType,
} from "../data/works.js";


/* =========================================================
   Constants
   ========================================================= */

const HOME_FULL_COUNT = 4;
const HOME_SHORT_COUNT = 6;

const DRAG_THRESHOLD = 48;


/* =========================================================
   Utility
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


function shuffle(items) {
  const array =
    [...items];

  for (
    let i = array.length - 1;
    i > 0;
    i -= 1
  ) {
    const j =
      Math.floor(
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


function normalizeIndex(
  index,
  length
) {
  if (
    length <= 0
  ) {
    return 0;
  }

  return (
    (index % length) +
    length
  ) % length;
}


/*
 * activeIndexから見た
 * 各カードの相対位置を返す。
 *
 * -2 = 左奥
 * -1 = 左
 *  0 = 中央
 *  1 = 右
 *  2 = 右奥
 */
function getCircularPosition(
  itemIndex,
  activeIndex,
  total
) {
  let difference =
    itemIndex -
    activeIndex;

  const half =
    total / 2;


  if (
    difference >
    half
  ) {
    difference -=
      total;
  }


  if (
    difference <
    -half
  ) {
    difference +=
      total;
  }


  /*
   * 偶数枚の真裏カードは
   * 正方向へ統一。
   */
  if (
    total % 2 === 0 &&
    Math.abs(
      difference
    ) === half
  ) {
    difference =
      Math.abs(
        difference
      );
  }


  return difference;
}


/* =========================================================
   Card body
   ========================================================= */

function createWorksBody(
  work
) {
  const body =
    createElement(
      "div",
      "works-body"
    );


  const title =
    createElement(
      "h3"
    );

  title.textContent =
    work.title;


  const type =
    createElement(
      "p"
    );

  type.textContent =
    work.type === "full"
      ? "Full"
      : "Short";


  body.appendChild(
    title
  );

  body.appendChild(
    type
  );


  return body;
}


/* =========================================================
   Full Card
   ========================================================= */

function createFullCard(
  work,
  index
) {
  const article =
    createElement(
      "article",
      "works-card home-works-card home-full-card"
    );


  article.dataset.homeIndex =
    String(index);

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
    createElement(
      "img"
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


  button.appendChild(
    image
  );

  video.appendChild(
    button
  );


  article.appendChild(
    video
  );


  article.appendChild(
    createWorksBody(
      work
    )
  );


  return article;
}


/* =========================================================
   Short Card
   ========================================================= */

function createShortCard(
  work,
  index
) {
  const article =
    createElement(
      "article",
      "works-card short-card home-works-card home-short-card"
    );


  article.dataset.homeIndex =
    String(index);

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


  link.appendChild(
    image
  );

  link.appendChild(
    playBadge
  );


  article.appendChild(
    link
  );


  article.appendChild(
    createWorksBody(
      work
    )
  );


  return article;
}


/* =========================================================
   Empty state
   ========================================================= */

function createEmptyState(
  type
) {
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
   Dot
   ========================================================= */

function createDot(
  work,
  index
) {
  const dot =
    createElement(
      "button",
      "home-works-dot"
    );


  dot.type =
    "button";

  dot.dataset.homeDot =
    String(index);


  dot.setAttribute(
    "aria-label",
    `${work.title}を表示`
  );


  return dot;
}


/* =========================================================
   Full playback
   ========================================================= */

function playFullVideo(
  facade
) {
  const videoId =
    facade.dataset.videoId;


  const title =
    facade.dataset.videoTitle ||
    "YouTube動画";


  if (
    !videoId
  ) {
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


/* =========================================================
   Home Rotary
   ========================================================= */

function createHomeRotary({
  container,
  previousButton,
  nextButton,
  items,
  type,
}) {
  if (
    !container
  ) {
    return null;
  }


  /*
   * 旧横スクロール用classを解除。
   * index.astroは変更せず再利用する。
   */
  container.classList.remove(
    "works-scroll",
    "full-scroll",
    "short-scroll"
  );


  container.classList.add(
    "home-works-rotary-track"
  );


  container.dataset.homeType =
    type;


  container.innerHTML =
    "";


  /*
   * 前回生成したdotsがあれば削除。
   */
  const wrap =
    container.closest(
      ".works-scroll-wrap"
    );


  if (
    wrap
  ) {
    wrap
      .querySelector(
        ".home-works-dots"
      )
      ?.remove();
  }


  if (
    items.length === 0
  ) {
    container.appendChild(
      createEmptyState(
        type
      )
    );

    return null;
  }


  const cards =
    items.map(
      (
        work,
        index
      ) => {
        const card =
          type === "full"
            ? createFullCard(
                work,
                index
              )
            : createShortCard(
                work,
                index
              );


        container.appendChild(
          card
        );


        return card;
      }
    );


  /* =======================================================
     Dots
     ======================================================= */

  const dotsContainer =
    createElement(
      "div",
      "home-works-dots"
    );


  const dots =
    items.map(
      (
        work,
        index
      ) => {
        const dot =
          createDot(
            work,
            index
          );


        dotsContainer.appendChild(
          dot
        );


        return dot;
      }
    );


  if (
    wrap
  ) {
    wrap.appendChild(
      dotsContainer
    );
  }


  /* =======================================================
     State
     ======================================================= */

  let activeIndex =
    0;

  let pointerId =
    null;

  let pointerStartX =
    0;

  let pointerCurrentX =
    0;

  let hasDragged =
    false;

  let suppressClick =
    false;


  /* =======================================================
     Render
     ======================================================= */

  const update =
    () => {
      cards.forEach(
        (
          card,
          index
        ) => {
          const position =
            getCircularPosition(
              index,
              activeIndex,
              cards.length
            );


          card.dataset
            .homePosition =
            String(
              position
            );


          const hidden =
            Math.abs(
              position
            ) > 2;


          card.dataset
            .homeHidden =
            hidden
              ? "true"
              : "false";


          const isActive =
            index ===
            activeIndex;


          card.classList.toggle(
            "is-active",
            isActive
          );


          card.setAttribute(
            "aria-current",
            isActive
              ? "true"
              : "false"
          );


          card.dataset.active =
            isActive
              ? "true"
              : "false";
        }
      );


      dots.forEach(
        (
          dot,
          index
        ) => {
          const isActive =
            index ===
            activeIndex;


          dot.classList.toggle(
            "is-active",
            isActive
          );


          dot.setAttribute(
            "aria-current",
            isActive
              ? "true"
              : "false"
          );
        }
      );
    };


  /* =======================================================
     Navigation
     ======================================================= */

  const goTo =
    (
      nextIndex
    ) => {
      activeIndex =
        normalizeIndex(
          nextIndex,
          items.length
        );


      update();
    };


  const next =
    () => {
      goTo(
        activeIndex + 1
      );
    };


  const previous =
    () => {
      goTo(
        activeIndex - 1
      );
    };


  if (
    previousButton
  ) {
    previousButton.addEventListener(
      "click",
      previous
    );
  }


  if (
    nextButton
  ) {
    nextButton.addEventListener(
      "click",
      next
    );
  }


  dots.forEach(
    (
      dot,
      index
    ) => {
      dot.addEventListener(
        "click",
        () => {
          goTo(
            index
          );
        }
      );
    }
  );


  /* =======================================================
     Card click
     ======================================================= */

  container.addEventListener(
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


      const card =
        target.closest(
          ".home-works-card"
        );


      if (
        !card ||
        !container.contains(
          card
        )
      ) {
        return;
      }


      const index =
        Number(
          card.dataset.homeIndex
        );


      if (
        Number.isNaN(
          index
        )
      ) {
        return;
      }


      /*
       * ドラッグ直後のclickを無効化。
       */
      if (
        suppressClick
      ) {
        event.preventDefault();

        return;
      }


      /*
       * 左右カードなら
       * リンク・再生より先に中央へ移動。
       */
      if (
        index !==
        activeIndex
      ) {
        event.preventDefault();

        goTo(
          index
        );

        return;
      }


      /*
       * 中央Full
       * → その場で再生
       */
      if (
        type === "full"
      ) {
        const facade =
          target.closest(
            ".full-video-facade"
          );


        if (
          facade instanceof
          HTMLButtonElement
        ) {
          event.preventDefault();

          playFullVideo(
            facade
          );
        }
      }


      /*
       * 中央Shortは
       * 通常のaリンクをそのまま通す。
       */
    }
  );


  /* =======================================================
     Keyboard
     ======================================================= */

  container.tabIndex =
    0;


  container.setAttribute(
    "role",
    "region"
  );


  container.setAttribute(
    "aria-label",
    type === "full"
      ? "Full実績カルーセル"
      : "Short実績カルーセル"
  );


  container.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
        "ArrowLeft"
      ) {
        event.preventDefault();

        previous();

        return;
      }


      if (
        event.key ===
        "ArrowRight"
      ) {
        event.preventDefault();

        next();
      }
    }
  );


  /* =======================================================
     Pointer drag / swipe
     ======================================================= */

  container.addEventListener(
    "pointerdown",
    (event) => {
      if (
        event.pointerType ===
          "mouse" &&
        event.button !==
          0
      ) {
        return;
      }


      pointerId =
        event.pointerId;


      pointerStartX =
        event.clientX;


      pointerCurrentX =
        event.clientX;


      hasDragged =
        false;


      container.classList.add(
        "is-dragging"
      );


      try {
        container.setPointerCapture(
          pointerId
        );
      } catch {
        // Pointer Capture非対応環境でも継続
      }
    }
  );


  container.addEventListener(
    "pointermove",
    (event) => {
      if (
        pointerId !==
        event.pointerId
      ) {
        return;
      }


      pointerCurrentX =
        event.clientX;


      const distance =
        pointerCurrentX -
        pointerStartX;


      if (
        Math.abs(
          distance
        ) > 8
      ) {
        hasDragged =
          true;
      }
    }
  );


  const finishPointer =
    (event) => {
      if (
        pointerId ===
        null
      ) {
        return;
      }


      if (
        event.pointerId !==
        pointerId
      ) {
        return;
      }


      const distance =
        pointerCurrentX -
        pointerStartX;


      container.classList.remove(
        "is-dragging"
      );


      try {
        if (
          container.hasPointerCapture(
            pointerId
          )
        ) {
          container.releasePointerCapture(
            pointerId
          );
        }
      } catch {
        // Pointer Capture非対応環境でも継続
      }


      pointerId =
        null;


      if (
        Math.abs(
          distance
        ) >=
        DRAG_THRESHOLD
      ) {
        suppressClick =
          true;


        if (
          distance < 0
        ) {
          next();
        }


        if (
          distance > 0
        ) {
          previous();
        }
      }


      window.setTimeout(
        () => {
          hasDragged =
            false;

          suppressClick =
            false;
        },
        0
      );
    };


  container.addEventListener(
    "pointerup",
    finishPointer
  );


  container.addEventListener(
    "pointercancel",
    finishPointer
  );


  update();


  return {
    next,
    previous,
    goTo,

    getActiveIndex() {
      return activeIndex;
    },
  };
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


          if (
            !target
          ) {
            return;
          }


          tabs.forEach(
            (item) => {
              const isActive =
                item ===
                tab;


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


  if (
    !fullContainer &&
    !shortContainer
  ) {
    return;
  }


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


  createHomeRotary({
    container:
      fullContainer,

    previousButton:
      document.getElementById(
        "homeFullPrev"
      ),

    nextButton:
      document.getElementById(
        "homeFullNext"
      ),

    items:
      fullWorks,

    type:
      "full",
  });


  createHomeRotary({
    container:
      shortContainer,

    previousButton:
      document.getElementById(
        "homeShortPrev"
      ),

    nextButton:
      document.getElementById(
        "homeShortNext"
      ),

    items:
      shortWorks,

    type:
      "short",
  });


  setupTabs();
}