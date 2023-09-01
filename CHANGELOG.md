# 7.1.2

Fixed a bug on Firefox where on certain PDFs the client rectangles were not found correctly.

Fixed a bug in PdfLoader.tsx where it was possible that the document would be loaded twice if both data and URL props changed.

For the Example App, added buttons for setting PDF source and local file for debugging purposes.

# 7.0.2

Added a style prop so that the PDFHighlighter div can be styled.

# 7.0.1

pdfScaleValue prop change piped to pdf-viewer on component update.

# 7.0.0

Added getPageCount, getCurrentPage props. These are not optional because most sensible readers would use them. Because this is a breaking change, I'm increasing the major version number.

I also added a destinationPage as an optional prop. Whenever this prop is changed, the viewer navigates to that page number.

The example app has been updated with bare bones UI to showcase these changes.

# 6.0.0

Upgraded to React 18 and added support for createRoot().

# 5.3.0

- [Added support of multi-page highlights](https://github.com/agentcooper/react-pdf-highlighter/pull/167), thanks to @jonathanbyrne!

# 3.0.0

- Update PDF.js dependency to 2.2.228.

# 2.1.1

- Enabled hyperlinks inside the PDF document (thanks @steevn).

# 2.0.0

- Renamed `PdfAnnotator` to `PdfHighlighter` all over the code for naming consistency.
