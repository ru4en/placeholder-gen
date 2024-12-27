# Dynamic Image Placholder Generator

This is a simple tool to generate dynamic image placeholders. It is useful for web developers who want to generate custom image placeholders for their projects.

demo: [dpi.rubenlopes.uk](https://dpi.rubenlopes.uk)

## Useage

Is a simple cdn link at the moment, just add the following to your html file:

```html

<script>
const defaultPlaceholderSettings = {
    width: 100,
    height: 100,
    bgColor: '#f0f0f0',
    fgColor: '#000000',
    text: 'Placeholder Image',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontFamily: 'Arial',
    iconUrl: "https://rubenlopes.uk/logo-small.png",
    iconSize: 100
};
</script>
<script src="src/placeholder.js"></script>

```

## Options

You can customize the placeholder by changing the default settings object. Here are the available options:

- `width` - The width of the image in pixels.
- `height` - The height of the image in pixels.
- `bgColor` - The background color of the image in hex format.
- `fgColor` - The foreground color of the text in hex format.
- `text` - The text to display in the image.
- `fontSize` - The font size of the text in pixels.
- `fontWeight` - The font weight of the text.
- `fontStyle` - The font style of the text.
- `fontFamily` - The font family of the text.
- `iconUrl` - The url of the icon to display in the image.
- `iconSize` - The size of the icon in pixels.

## License

Not sure yet, but probably MIT. Feel free to use and modify this tool as you see fit.
