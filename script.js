const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style)

const initalColors = {
    bg: getStyle(html, "--bg"),
    bgGroup: getStyle(html, "--bg-group"),
    borderGroup: getStyle(html, "--border-group"),
    bgSmall: getStyle(html, "--bg-small"),
}

const darkMode = {
    bg: "#0c0c0c", 
    bgGroup: "#2f2f2f",
    borderGroup: "#464545",
    bgSmall: "#1b1b1b"
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key])
    )
}


checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initalColors)
})