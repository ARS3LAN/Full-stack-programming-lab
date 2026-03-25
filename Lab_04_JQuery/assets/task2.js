$(document).ready(function() {
    const images = [
        { src: "assets/image1.jpg", caption: "Caption: Image 1" },
        { src: "assets/image2.jpg", caption: "Caption: Image 2" },
        { src: "assets/image3.jpg", caption: "Caption: Image 3" }
    ];
    let currentIndex = 0;

    function updateGallery(index) {
        $("#galleryImage").fadeOut(400, function() {
            $(this).attr("src", images[index].src).fadeIn(400);
        });
        
        $("#imageCaption").fadeOut(400, function() {
            $(this).text(images[index].caption).fadeIn(400);
        });
    }

    $("#nextBtn").click(function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery(currentIndex);
    });

    $("#prevBtn").click(function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery(currentIndex);
    });
});