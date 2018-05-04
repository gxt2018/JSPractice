var pieChart = {
    width: 600,
    height: 400,
    series: [],
    unit: "kg",
    chartCanvas: null,
    selectable : true,
    title: "Pie Chart",
    legend : {
        enable : true
    },
    edge : {
        width: 50,
        height: 50
    },
    animation: {
        enable: true,
        animCanvas : null,
        hh: 1, // trick is here!! for animation play
        pctx: null
    },
    tooltips: {
        enable: true,
        tooltipCanvas : null,
        ttContext: null,
        index: -1
    },
    circle : {
        cx: 0,
        cy: 0,
        radius: 0

    },
    text : {
        enable: false,
        content:[]
    },

    initSettings: function (config) {
        this.chartCanvas = config.canvas;
        this.chartCanvas.width = config.width;
        this.chartCanvas.height = config.height;
        this.width = config.width;
        this.height = config.height;
        this.series = config.series;
        this.title = config.title;
        this.unit = config.unit;
        if(config.tooltips != undefined) {
            this.tooltips.enable = config.tooltips.enable;
        }
        if(config.animation != undefined) {
            this.animation.enable = config.animation.enable;
        }
        if(config.legend != undefined) {
            this.legend.enable = config.legend.enable;
        }
        if(config.text != undefined) {
            this.text.enable = config.text.enable;
        }
    },

    render : function() {
        // initialization circle
        this.circle.cx = this.width/2;
        this.circle.cy = this.height/2;
        this.circle.radius = Math.min(this.width/2, this.height/2) - Math.max(this.edge.width, this.edge.height);
        var ctx = null;
        if(this.animation.enable) {
            this.animation.animCanvas = document.createElement("canvas");
            this.animation.animCanvas.width = this.width;
            this.animation.animCanvas.height = this.height;
            ctx = this.animation.animCanvas.getContext("2d");
        } else {
            ctx = this.chartCanvas.getContext("2d");
            this.renderBorder(ctx);
        }

        if(this.circle.radius <= 0) {
            ctx.strokeText("Can not reader the chart, Circle is too small.");
            return;
        }

        // draw each arc according to data series
        var sum = 0;
        var nums = this.series.length;
        for(var i=0; i<nums; i++) {
            sum += this.series[i].value;
        }

        // draw title
        ctx.font = '18pt Calibri';
        ctx.fillText(this.title, this.width/2 - this.edge.width, 30);
        ctx.save();
        var deltaArc = 0;
        for(var i=0; i<nums; i++) {
            var precent = this.series[i].value/sum;
            this.renderPie(ctx, i, precent, deltaArc);
            deltaArc += 2*Math.PI * precent;
        }
        ctx.restore();

        // add blur shadow
        ctx.save();
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.circle.cx, this.circle.cy, this.circle.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "RGBA(127,127,127,1)";
        ctx.stroke();
        ctx.restore();

        // render legend
        ctx.save();
        ctx.restore();

        // play animation
        if(this.animation.enable) {
            var parent = this;
            this.animation.pctx = this.chartCanvas.getContext("2d");
            this.renderBorder(this.animation.pctx);
            setTimeout(function() {parent.playAnimation(parent);}, 1000/90);
        }
    },

    renderBorder : function(ctx) {
        ctx.save();
        ctx.fillStyle="white";
        ctx.strokeStyle="black";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeRect(0, 0, this.width, this.height);
        ctx.restore();
    },

    renderPie : function(ctx, index, precent, deltaArc) {
        var endAngle = deltaArc + 2*Math.PI*precent;
        ctx.beginPath();
        ctx.arc(this.circle.cx, this.circle.cy, this.circle.radius, deltaArc, endAngle, false);
        ctx.moveTo(this.circle.cx, this.circle.cy);
        ctx.lineTo(this.circle.cx + this.circle.radius * Math.cos(deltaArc), this.circle.cy + this.circle.radius * Math.sin(deltaArc));
        ctx.lineTo(this.circle.cx + this.circle.radius * Math.cos(endAngle), this.circle.cy + this.circle.radius * Math.sin(endAngle));
        ctx.lineTo(this.circle.cx, this.circle.cy);
        ctx.closePath();
        ctx.fillStyle = this.series[index].color;
        ctx.fill();

        // render text content
        if(this.text.enable) {
            var halfEndAngle = deltaArc + Math.PI*precent;
            var hx = this.circle.cx + this.circle.radius * Math.cos(halfEndAngle);
            var hy = this.circle.cy + this.circle.radius * Math.sin(halfEndAngle);
            ctx.beginPath();
            ctx.moveTo(hx, hy);
            var linePos = (hx < this.circle.cx) ? (hx - this.edge.width) : (hx + this.edge.width);
            ctx.lineTo(linePos, hy);
            ctx.closePath();
            ctx.strokeStyle="orange";
            ctx.stroke();
            var textPos = (hx < this.circle.cx) ? (hx - this.edge.width*2) : (hx + this.edge.width);
            precent = Math.round (precent*100) / 100;
            var size = this.text.content.length;
            var tipStr = (size > index) ? this.text.content[index] : this.series[index].name + ": " + (precent * 100).toFixed(0) + "%";
            ctx.font = '10pt Calibri';
            ctx.fillStyle="black";
            ctx.fillText(tipStr, textPos, hy);
        }
    },

    playAnimation : function(parent) {
        if(parent.animation.hh < parent.height) {
            parent.animation.pctx.save();
            parent.animation.pctx.globalAlpha=0.5;
            parent.animation.pctx.clearRect(0,0,parent.width, parent.height);
            parent.renderBorder(parent.animation.pctx);
            parent.animation.pctx.drawImage(parent.animation.animCanvas, 0, 0, parent.width, this.animation.hh, 0, 0, parent.width, this.animation.hh);
            parent.animation.hh = parent.animation.hh + 10;
            parent.animation.pctx.restore();
            setTimeout(function() {parent.playAnimation(parent);}, 1000/10);
        } else {
            parent.animation.pctx.clearRect(0,0,parent.width, parent.height);
            parent.renderBorder(parent.animation.pctx);
            parent.animation.pctx.drawImage(parent.animation.animCanvas, 0, 0, parent.width, parent.height, 0, 0, parent.width, parent.height);

            // enable tool-tip functionality
            if(parent.animation.enable && parent.legend.enable) {
                parent.chartCanvas.addEventListener('mousemove', function(event) {
                    var x = event.pageX;
                    var y = event.pageY;
                    var canvas = event.target;
                    var bbox = canvas.getBoundingClientRect();
                    var loc = { x: x - bbox.left * (canvas.width  / bbox.width),
                        y: y - bbox.top  * (canvas.height / bbox.height)};

                }, false);
            }
        }
    },

};