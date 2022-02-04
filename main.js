/**
 * @params parhCode? http://www.jma.go.jp/bosai/common/const/area.json に記載のあるエリアコード。デフォルトは東京
 */
class TokyoWeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const pathCode = this.hasAttribute("path-code")
      ? this.getAttribute("path-code")
      : "130000";

    // (内部の) span 要素を生成
    const wrapper = document.createElement("div");
    this.wrapper = wrapper;
    wrapper.setAttribute("class", "wrapper");

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = "東京都の今日の天気";
    wrapper.appendChild(cardTitle);

    const cardContent = document.createElement("div");
    this.fetchAndSetData(cardContent, pathCode);
    wrapper.appendChild(cardContent);

    const style = document.createElement("style");
    style.textContent = `
    .wrapper {
      background-color: #cccccc;
      color: #111111;
      padding: 1rem;
    }
    .wrapper.alert {
      background-color: #cc5555;
      color: #111111;
      padding: 1rem;
    }
    .wrapper.advisory {
      background-color: #cccc55;
      color: #111111;
      padding: 1rem;
    }
    `;

    this.shadowRoot.append(wrapper, style);
  }

  async fetchAndSetData(element, pathCode) {
    const fetchWarning = async () => {
      const result = await (
        await fetch(
          `https://www.jma.go.jp/bosai/warning/data/warning/${pathCode}.json`
        )
      ).json();
      return result;
    };
    // this.wrapper.classList.add("alert");

    const dataFromGoJp = await fetchWarning();

    element.innerText = dataFromGoJp["headlineText"];
  }
}

customElements.define("tokyo-weather-card", TokyoWeatherCard);
