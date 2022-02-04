class TokyoWeatherCard extends HTMLElement {
  constructor() {
    super();
    // シャドウルートを生成
    this.attachShadow({ mode: "open" });

    // (内部の) span 要素を生成
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = "東京都の今日の天気";
    wrapper.appendChild(cardTitle);

    const cardContent = document.createElement("div");
    this.fetchAndSetData(cardContent);
    wrapper.appendChild(cardContent);

    this.shadowRoot.append(wrapper);
  }

  async fetchAndSetData(element) {
    const fetchWarning = async (areaCode) => {
      const result = await (
        await fetch(
          `https://www.jma.go.jp/bosai/warning/data/warning/${areaCode}.json`
        )
      ).json();
      console.log(JSON.stringify(result, undefined, 2));
      return result;
    };

    const dataFromGoJp = await fetchWarning("130000");

    element.innerText = dataFromGoJp["headlineText"];
  }
}

customElements.define("tokyo-weather-card", TokyoWeatherCard);
