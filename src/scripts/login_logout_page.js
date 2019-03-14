function preloadMyImages()
{
    var imageList = [
        "../assets/images/white-logo.png"
    ];
    for(var i = 0; i < imageList.length; i++ )
    {
        var imageObject = new Image();
        imageObject.src = imageList[i];
    }
}
