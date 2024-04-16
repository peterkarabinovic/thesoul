module.exports = function PostGraphileUploadFieldPlugin(builder, options) {
    // console.log("PostGraphileUploadFieldPlugin",/ {options});
    require("./upload-field")(builder, options);
  };