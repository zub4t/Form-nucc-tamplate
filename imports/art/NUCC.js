/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * @param {Array} polygon an array representation of the polygon where polygon[i][0] is the x Value of the i-th point and polygon[i][1] is the y Value.
 * @param {Array} point   an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
 */
const pointInPolygon = function(polygon, point) {
    //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    let odd = false;
    //For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        //If a line from the point into infinity crosses this edge
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) // One point needs to be above, one below our y coordinate
            // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
            &&
            (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            // Invert odd
            odd = !odd;
        }
        j = i;

    }
    //If the number of crossings was odd, the point is in the polygon
    return odd;
};







function drawLightning(ctx, polygon) {
    const points = new Array();
    points.push({ "x": polygon[3][0], "y": polygon[3][1] })
    while (points.length < 10) {
        let x = Math.floor(Math.random() * ctx.canvas.width);
        let y = Math.floor(Math.random() * ctx.canvas.height);
        //polygon[i][0] is the x Value 

        if (pointInPolygon(polygon, [x, y])) {
            points.push({ "x": x, "y": y })
        }

    }


    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length) {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[(i) + 1].x, points[(i) + 1].y);
            ctx.stroke();
        }


    }



}


window.addEventListener('load', () => {


    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute"
    canvas.style.top = "-180px"
    canvas.style.zIndex = "99"
    canvas.style.cursor = "pointer"
    canvas.style.transform = " scale(0.2, 0.2)"
    canvas.style.left = "-180px"
    canvas.width = 500
    canvas.height = 500
    var flag = true;
    var upperLimit = 5;
    var downLimit = 0;
    var c = 0.5
        //canvas.style.border = "1px solid black"
    document.querySelector("#main").prepend(canvas);
    const ctx = canvas.getContext('2d');


    var offset = downLimit
    setInterval(() => {
        if (flag) {
            offset += c
        } else {
            offset -= c
        }

        if (offset > upperLimit || offset < downLimit) {
            flag = !flag;

        }




        ctx.clearRect(0, 0, canvas.width, canvas.height);
        /*
                if (offset - 2 < downLimit) {
                    drawLightning(ctx, [
                        [0, 0],
                        [0, 375],
                        [125, 375],
                        [125, 125]
                    ]);

                    drawLightning(ctx, [
                        [0, 0],
                        [500, 0],
                        [500, 125],
                        [375, 125]
                    ]);

                    drawLightning(ctx, [
                        [375, 500],
                        [500, 500],
                        [500, 375],
                        [375, 375]
                    ]);


                    drawLightning(ctx, [
                        [125, 500],
                        [0, 500],
                        [0, 375],
                        [125, 375]
                    ]);

                }

        */

        ctx.fillStyle = "#f1f1f1";
        ctx.fillRect(
            (canvas.width / 4),
            (canvas.height / 4),
            (canvas.width / 2),
            (canvas.height / 2));

        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(
            (canvas.width / 4) + offset,
            (canvas.height / 4) + offset,
            (canvas.width / 2) - offset * 2,
            (canvas.height / 2) - offset * 2);


        ctx.fillStyle = "#f1f1f1";
        ctx.fillRect(
            (canvas.width / 4) + 20,
            (canvas.height / 4) + 20,
            (canvas.width / 2) - 40,
            (canvas.height / 2) - 40);


        ctx.fillStyle = "#27ae60";
        ctx.fillRect(
            (canvas.width / 4) + 20 + offset,
            (canvas.height / 4) + 20 + offset,
            (canvas.width / 2) - 40 - offset * 2,
            (canvas.height / 2) - 40 - offset * 2);


        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc((canvas.width / 4) + 40 - offset / 2,
            (canvas.height / 4) + 40 + offset,
            10 - offset, 0,
            2 * Math.PI);
        ctx.fill();



        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc((canvas.width / 2 + canvas.width / 4 - 40) - offset / 2,
            (canvas.height / 4 + 40 + offset),
            10 - offset, 0,
            2 * Math.PI);
        ctx.fill();


        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc((canvas.width / 4) + 40 - offset / 2,
            (canvas.height / 2) + (canvas.height / 4) - 40 - offset / 2,
            10 - offset,
            0,
            2 * Math.PI);
        ctx.fill();


        ctx.fillStyle = "#f1f1f1";
        ctx.fillRect(
            (canvas.width / 4) + 50,
            (canvas.height / 4) + 50,
            (canvas.width / 2) - 100,
            (canvas.height / 2) - 100);
        ctx.fillStyle = "#353c3e";
        ctx.fillRect(
            (canvas.width / 4) + 50 + offset,
            (canvas.height / 4) + 50 + offset,
            (canvas.width / 2) - 100 - offset * 2,
            (canvas.height / 2) - 100 - offset * 2);



        ctx.fillStyle = "#f1f1f1";
        ctx.fillRect(
            (canvas.width / 4) + 60,
            (canvas.height / 4) + 60,
            (canvas.width / 2) - 120,
            (canvas.height / 2) - 120);
        ctx.fillStyle = "#1c2021";
        ctx.fillRect(
            (canvas.width / 4) + 60 + offset,
            (canvas.height / 4) + 60 + offset,
            (canvas.width / 2) - 120 - offset * 2,
            (canvas.height / 2) - 120 - offset * 2);


        ctx.fillStyle = "#b8c3c3";
        ctx.fillRect(
            (canvas.width / 4) + 70 + offset,
            (canvas.height / 4) + 70 + offset,
            (canvas.width / 2) - 200 - offset * 2,
            (canvas.height / 2) - 200 - offset * 2);


        ctx.fillStyle = "#b8c3c3";
        ctx.fillRect(
            (canvas.width / 4) + 130 + offset,
            (canvas.height / 4) + 70 + offset,
            (canvas.width / 2) - 200 - offset * 2,
            (canvas.height / 2) - 200 - offset * 2);


        ctx.fillStyle = "#b8c3c3";
        ctx.fillRect(
            (canvas.width / 4) + 70 + offset,
            (canvas.height / 4) + 130 + offset,
            (canvas.width / 2) - 200 - offset * 2,
            (canvas.height / 2) - 200 - offset * 2);

        ctx.fillStyle = "#b8c3c3";
        ctx.fillRect(
            (canvas.width / 4) + 130 + offset,
            (canvas.height / 4) + 130 + offset,
            (canvas.width / 2) - 200 - offset * 2,
            (canvas.height / 2) - 200 - offset * 2);

        ctx.fillStyle = "#6b797e";
        ctx.fillRect(
            (canvas.width / 4) + 85 + offset,
            (canvas.height / 4) + 90 + offset,
            (canvas.width / 2) - 230 - offset * 2,
            (canvas.height / 2) - 220 - offset * 2);


        ctx.fillStyle = "#6b797e";
        ctx.fillRect(
            (canvas.width / 4) + 145 + offset,
            (canvas.height / 4) + 70 + offset,
            (canvas.width / 2) - 230 - offset * 2,
            (canvas.height / 2) - 220 - offset * 2);

        ctx.fillStyle = "#6b797e";
        ctx.fillRect(
            (canvas.width / 4) + 90 + offset,
            (canvas.height / 4) + 150 + offset,
            (canvas.width / 2) - 220 - offset * 2,
            (canvas.height / 2) - 230 - offset * 2);



        ctx.fillStyle = "#6b797e";
        ctx.fillRect(
            (canvas.width / 4) + 150 + offset,
            (canvas.height / 4) + 150 + offset,
            (canvas.width / 2) - 220 - offset * 2,
            (canvas.height / 2) - 230 - offset * 2);






        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 70 + offset,
            (canvas.height / 4) + 30 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);



        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 110 + offset,
            (canvas.height / 4) + 30 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);


        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 150 + offset,
            (canvas.height / 4) + 30 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);


        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 70 + offset,
            (canvas.height / 4) + 200 - offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);

        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 110 + offset,
            (canvas.height / 4) + 200 - offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);


        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 150 + offset,
            (canvas.height / 4) + 200 - offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);


        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 200 - offset,
            (canvas.height / 4) + 70 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);



        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 200 - offset,
            (canvas.height / 4) + 110 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);



        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 200 - offset,
            (canvas.height / 4) + 150 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);






        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 30 + offset,
            (canvas.height / 4) + 70 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);




        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 30 + offset,
            (canvas.height / 4) + 110 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);



        ctx.fillStyle = "yellow";
        ctx.fillRect(
            (canvas.width / 4) + 30 + offset,
            (canvas.height / 4) + 150 + offset,
            (canvas.width / 2) - 230,
            (canvas.height / 2) - 230);


    }, 100)
})