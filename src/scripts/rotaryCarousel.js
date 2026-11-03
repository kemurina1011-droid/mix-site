import {
  getActivePricing,
  getFeaturedPricing,
} from "../data/pricing.js";

import {
  getActiveDiscounts,
  getFeaturedDiscount,
} from "../data/discounts.js";


/* =========================================================
   Constants
   ========================================================= */

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


function normalizeIndex(
  index,
  length
) {
  if (length <= 0) {
    return 0;
  }

  return (
    (index % length) +
    length
  ) % length;
}


/*
 * 無限循環カルーセル用。
 *
 * activeIndexから見て、
 * 各カードが左・右の何番目かを計算。
 *
 * 例：
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
   * 偶数枚の場合、
   * 真裏のカードが
   * +2 / -2 のどちらにもなり得る。
   *
   * 表示の安定性のため、
   * 正方向を採用する。
   */
  if (
    total % 2 === 0 &&
    Math.abs(difference) ===
      half
  ) {
    difference =
      Math.abs(difference);
  }

  return difference;
}


/* =========================================================
   Value helpers
   ========================================================= */

function getItemValue(
  item,
  kind
) {
  if (
    kind === "pricing"
  ) {
    return {
      main:
        item.priceLabel ||
        `¥${Number(
          item.price || 0
        ).toLocaleString(
          "ja-JP"
        )}`,

      suffix:
        item.suffix || "",
    };
  }

  return {
    main:
      item.amountLabel ||
      `-¥${Number(
        item.amount || 0
      ).toLocaleString(
        "ja-JP"
      )}`,

    suffix: "",
  };
}


/* =========================================================
   Card
   ========================================================= */

function createRotaryCard(
  item,
  kind,
  index
) {
  const card =
    createElement(
      "article",
      "rotary-card"
    );

  card.dataset.rotaryIndex =
    String(index);

  card.dataset.itemId =
    item.id;

  card.tabIndex =
    0;

  card.setAttribute(
    "role",
    "button"
  );

  card.setAttribute(
    "aria-label",
    `${item.title}を中央に表示`
  );


  const top =
    createElement(
      "div",
      "rotary-card-top"
    );


  const kicker =
    createElement(
      "div",
      "rotary-card-kicker"
    );

  kicker.textContent =
    kind === "pricing"
      ? "PRICE"
      : "DISCOUNT";


  const title =
    createElement(
      "h3",
      "rotary-card-title"
    );

  title.textContent =
    item.title;


  const value =
    createElement(
      "div",
      "rotary-card-value"
    );


  const valueData =
    getItemValue(
      item,
      kind
    );


  const valueMain =
    createElement(
      "span",
      "rotary-card-value-main"
    );

  valueMain.textContent =
    valueData.main;


  const valueSuffix =
    createElement(
      "span",
      "rotary-card-value-suffix"
    );

  valueSuffix.textContent =
    valueData.suffix;


  value.appendChild(
    valueMain
  );


  if (
    valueData.suffix
  ) {
    value.appendChild(
      valueSuffix
    );
  }


  const description =
    createElement(
      "p",
      "rotary-card-description"
    );

  description.textContent =
    item.description || "";


  const note =
    createElement(
      "p",
      "rotary-card-note"
    );

  note.textContent =
    item.note || "";


  top.appendChild(
    kicker
  );

  top.appendChild(
    title
  );

  top.appendChild(
    value
  );

  top.appendChild(
    description
  );


  card.appendChild(
    top
  );


  if (
    item.note
  ) {
    card.appendChild(
      note
    );
  }


  return card;
}


/* =========================================================
   Dots
   ========================================================= */

function createDot(
  item,
  index
) {
  const dot =
    createElement(
      "button",
      "rotary-dot"
    );

  dot.type =
    "button";

  dot.dataset.rotaryDot =
    String(index);

  dot.setAttribute(
    "aria-label",
    `${item.title}を表示`
  );

  return dot;
}


/* =========================================================
   Payment chips
   ========================================================= */

function createPaymentMethods() {
  const wrapper =
    createElement(
      "div",
      "payment-methods-compact"
    );


  const methods = [
    "銀行振込",
    "Apple Pay",
    "Google Pay",
    "クレジットカード",
    "PayPay",
  ];


  methods.forEach(
    (method) => {
      const chip =
        createElement(
          "span",
          "payment-chip"
        );

      chip.textContent =
        method;

      wrapper.appendChild(
        chip
      );
    }
  );


  return wrapper;
}


/* =========================================================
   Structure
   ========================================================= */

function buildCarouselStructure(
  root,
  items,
  config
) {
  root.innerHTML =
    "";


  const header =
    createElement(
      "div",
      "rotary-header"
    );


  const headerCopy =
    createElement(
      "div",
      "rotary-header-copy"
    );


  const heading =
    createElement(
      "h3",
      "rotary-heading"
    );

  heading.textContent =
    config.heading;


  const description =
    createElement(
      "p",
      "rotary-description"
    );

  description.textContent =
    config.description;


  headerCopy.appendChild(
    heading
  );

  headerCopy.appendChild(
    description
  );


  const controls =
    createElement(
      "div",
      "rotary-controls"
    );


  const previousButton =
    createElement(
      "button",
      "rotary-control"
    );

  previousButton.type =
    "button";

  previousButton.dataset
    .rotaryPrevious = "";

  previousButton.innerHTML =
    "&#8592;";

  previousButton.setAttribute(
    "aria-label",
    "前のカード"
  );


  const nextButton =
    createElement(
      "button",
      "rotary-control"
    );

  nextButton.type =
    "button";

  nextButton.dataset
    .rotaryNext = "";

  nextButton.innerHTML =
    "&#8594;";

  nextButton.setAttribute(
    "aria-label",
    "次のカード"
  );


  controls.appendChild(
    previousButton
  );

  controls.appendChild(
    nextButton
  );


  header.appendChild(
    headerCopy
  );

  header.appendChild(
    controls
  );


  const stage =
    createElement(
      "div",
      "rotary-stage"
    );

  stage.tabIndex =
    0;

  stage.setAttribute(
    "role",
    "region"
  );

  stage.setAttribute(
    "aria-label",
    config.ariaLabel
  );


  const track =
    createElement(
      "div",
      "rotary-track"
    );


  items.forEach(
    (
      item,
      index
    ) => {
      track.appendChild(
        createRotaryCard(
          item,
          config.kind,
          index
        )
      );
    }
  );


  stage.appendChild(
    track
  );


  const indicator =
    createElement(
      "div",
      "rotary-active-indicator"
    );


  items.forEach(
    (
      item,
      index
    ) => {
      indicator.appendChild(
        createDot(
          item,
          index
        )
      );
    }
  );


  const hint =
    createElement(
      "p",
      "rotary-hint"
    );

  hint.textContent =
    "左右にドラッグ・スワイプ、または矢印で切り替え";


  root.appendChild(
    header
  );

  root.appendChild(
    stage
  );

  root.appendChild(
    indicator
  );

  root.appendChild(
    hint
  );


  if (
    config.kind ===
    "pricing"
  ) {
    root.appendChild(
      createPaymentMethods()
    );
  }


  return {
    stage,
    track,
    previousButton,
    nextButton,
    cards:
      Array.from(
        track.querySelectorAll(
          ".rotary-card"
        )
      ),
    dots:
      Array.from(
        indicator.querySelectorAll(
          ".rotary-dot"
        )
      ),
  };
}


/* =========================================================
   Controller
   ========================================================= */

function createRotaryCarousel(
  root,
  items,
  config
) {
  if (
    !root ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return;
  }


  const structure =
    buildCarouselStructure(
      root,
      items,
      config
    );


  const {
    stage,
    previousButton,
    nextButton,
    cards,
    dots,
  } = structure;


  let activeIndex = 0;

  let pointerId = null;

  let pointerStartX = 0;

  let pointerCurrentX = 0;

  let hasDragged = false;


  /* =========================================
     Featured initial card
     ========================================= */

  if (
    config.featuredId
  ) {
    const featuredIndex =
      items.findIndex(
        (item) =>
          item.id ===
          config.featuredId
      );

    if (
      featuredIndex >= 0
    ) {
      activeIndex =
        featuredIndex;
    }
  }


  /* =========================================
     Render positions
     ========================================= */

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
            .rotaryPosition =
            String(position);


          const hidden =
            Math.abs(
              position
            ) > 2;


          card.dataset
            .rotaryHidden =
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


          /*
           * 中央以外もクリック可能だが、
           * Tab移動は中央カードだけに限定。
           */
          card.tabIndex =
            isActive
              ? 0
              : -1;
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


  /* =========================================
     Navigation
     ========================================= */

  const goTo =
    (
      nextIndex,
      options = {}
    ) => {
      activeIndex =
        normalizeIndex(
          nextIndex,
          items.length
        );

      update();


      if (
        options.focus ===
        true
      ) {
        cards[
          activeIndex
        ]?.focus(
          {
            preventScroll: true,
          }
        );
      }
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


  /* =========================================
     Arrow buttons
     ========================================= */

  previousButton
    .addEventListener(
      "click",
      previous
    );


  nextButton
    .addEventListener(
      "click",
      next
    );


  /* =========================================
     Card click
     ========================================= */

  cards.forEach(
    (
      card,
      index
    ) => {
      card.addEventListener(
        "click",
        () => {
          if (
            hasDragged
          ) {
            return;
          }

          if (
            index ===
            activeIndex
          ) {
            return;
          }

          goTo(index);
        }
      );
    }
  );


  /* =========================================
     Dots
     ========================================= */

  dots.forEach(
    (
      dot,
      index
    ) => {
      dot.addEventListener(
        "click",
        () => {
          goTo(index);
        }
      );
    }
  );


  /* =========================================
     Keyboard
     ========================================= */

  stage.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
        "ArrowLeft"
      ) {
        event.preventDefault();

        previous();
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


  cards.forEach(
    (
      card,
      index
    ) => {
      card.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key ===
              "Enter" ||
            event.key ===
              " "
          ) {
            event.preventDefault();

            goTo(
              index,
              {
                focus: true,
              }
            );
          }
        }
      );
    }
  );


  /* =========================================
     Pointer drag / swipe
     ========================================= */

  stage.addEventListener(
    "pointerdown",
    (event) => {
      /*
       * マウスの右クリックなどは対象外
       */
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


      stage.classList.add(
        "is-dragging"
      );


      stage.setPointerCapture(
        pointerId
      );
    }
  );


  stage.addEventListener(
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


      stage.classList.remove(
        "is-dragging"
      );


      if (
        stage.hasPointerCapture(
          pointerId
        )
      ) {
        stage.releasePointerCapture(
          pointerId
        );
      }


      pointerId =
        null;


      if (
        Math.abs(
          distance
        ) >=
        DRAG_THRESHOLD
      ) {
        /*
         * 左へスワイプ
         * → 次
         */
        if (
          distance < 0
        ) {
          next();
        }

        /*
         * 右へスワイプ
         * → 前
         */
        if (
          distance > 0
        ) {
          previous();
        }
      }


      /*
       * pointerup直後に発生するclickで
       * カードが再選択されないよう
       * 1フレーム後に解除。
       */
      requestAnimationFrame(
        () => {
          hasDragged =
            false;
        }
      );
    };


  stage.addEventListener(
    "pointerup",
    finishPointer
  );


  stage.addEventListener(
    "pointercancel",
    finishPointer
  );


  /* =========================================
     Initial render
     ========================================= */

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
   Pricing
   ========================================================= */

function initPricingCarousel() {
  const root =
    document.getElementById(
      "pricingRotary"
    );


  if (!root) {
    return;
  }


  const items =
    getActivePricing();


  const featured =
    getFeaturedPricing();


  createRotaryCarousel(
    root,
    items,
    {
      kind:
        "pricing",

      heading:
        "料金",

      description:
        "ご依頼内容に合わせて、各プランをご確認ください。",

      ariaLabel:
        "MIX料金プラン",

      featuredId:
        featured?.id ||
        null,
    }
  );
}


/* =========================================================
   Discounts
   ========================================================= */

function initDiscountCarousel() {
  const root =
    document.getElementById(
      "discountRotary"
    );


  if (!root) {
    return;
  }


  const items =
    getActiveDiscounts();


  const featured =
    getFeaturedDiscount();


  createRotaryCarousel(
    root,
    items,
    {
      kind:
        "discount",

      heading:
        "割引",

      description:
        "条件に応じてご利用いただける割引をご用意しています。",

      ariaLabel:
        "MIX割引一覧",

      featuredId:
        featured?.id ||
        null,
    }
  );
}


/* =========================================================
   Public initializer
   ========================================================= */

export function initRotaryCarousels() {
  initPricingCarousel();

  initDiscountCarousel();
}