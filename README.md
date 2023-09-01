## react-pdf-highlighter-with-categories

`react-pdf-highlighter-with-categories` is a fork of @artemtyurin's react-pdf-highlighter. It adds the option of assigning new categories and colors to highlights. We decided not to issue a pull request to the original repo because these changes are specific to our niche project. 

There are also smaller fixes such as adding missing spaces in the highlight strings. PDF.js (onto which react-pdf-highlighter is based) has a text layer that consists of rectangular spans of text. Two of these spans can be within the same line of text on the PDF document. Annoyingly, these spans do not contain an ending white space even if there is a space in the actual visible text. This entails that highlights created by react-pdf-highlighter have missing white space. The issue is fixed in this fork with a hack. The hack was done again for specific niche reasons that would not likely matter for the original repo.


