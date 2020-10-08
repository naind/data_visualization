/*
    main.js
*/



var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y.%m.%d");
var formatPercent = d3.format(".0%");



var time = 0;
var count_ = 0;



d3.csv("data/data01.csv",type,function(error, data) {
    if (error) throw error;

    // console.log(data);
    var device = data.columns.slice(1).map(function(id) {  // close 부터 id 추출
        return {
            id: id,
            values: data.map(function(d) {
              // console.log(d.date);
                return {date: d.date, rate: d[id]};
                })
            };
        });

    var n = 30,
        duration = 750,
        count = 0,
        ydata = d3.range(n).map(function(){return {x:new Date(device[0].values[0].date-((86400E+3)*30-n)),y:0}});
        for (var i=0;i<n;i++){

          ydata[i].x = new Date( device[0].values[0].date - (86400E+3) * (30-i) );
          // console.log( new Date( device[0].values[0].date - (86400E+3) * (30-i) ) );
          // console.log(ydata[i].x);
        }
        // console.log(ydata);
        // console.log(device);
    // var min = device[0].values[0].date;
        // console.log(min);
        // console.log(device);
        // console.log(new Date(device[0].values[0].date-2592E+6));
    // console.log(d3.min(data,function(d){return d.date.setDate(getDate()+30)}));
    // console.log(min);
    // console.log(new Date(min.setDate(min.getDate()-30)));
    // console.log(d3.extent(data, function(d) { return d.date; }));
    // console.log(d3.extent([ d3.min(data,function(d){return d.date}) ]));
    console.log(data);
    // console.log(ydata);

var x = d3.scaleTime()
        // .domain(d3.extent(data, function(d) { return d.date; }))  // extent data내 최소,최댓값을 x축에 그림
        .domain([device[0].values[0].date-((86400E+3)*30),device[0].values[0].date])  //  오래된 날짜를 기준으로, 30일전부터 기준날짜까지
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([-0.10,0.10])
        .range([height, 0]);

    var z = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(device.map(function(c) { return c.id; }));


    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d,i) {
// console.log(new Date(data[count].date-(86400E+3)));
// console.log(count);
          // return x(d.x) })
          return x(data[count].date-(86400E+3)); })
        .y(function(d,i) {
            // console.log(data[count].samsung);
            return y(100); });
            // return y((data[count].samsung).format(formatPercent)); });



// X, Y축, 중간라인 설정
var axis = g.append("g")
        .attr("class","x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x.axis = d3.axisBottom(x));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y)
                .tickFormat(formatPercent))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("rate %")
        .style("font","13px sans-serif");

    g.append("g")
        .append("rect")
        .attr("width",width)
        .attr("height",1)
        .attr("y",height/2)
        .style("opacity",0.3);
        // .attr("x",)


    g.append("defs").append("clipPath")
        .attr("id","clip")
        .append("rect")
        .attr("width",width)
        .attr("height",height);


    g.append("g")
        .attr("clip-path","url(#clip)")
        .append("path")
        .datum(ydata)
        .attr("class","line")
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .on("start",tick);


    // d3.interval(function(){
    //
    //     count = (count < 60) ? count+1 : 0
    //     update(data);
    //
    // },1000)
    //
    //   update(data[0]);

// 라인, 텍스트 설정
    var etc = g.selectAll(".etc")
        .data(device)
        .enter()
        .append("g")
        .attr("class", "etc");

    // etc.append("path")
    //     .attr("class", "line")
    //     .attr("d", function(d) { return line(d.values); })
    //     .style("stroke", function(d) { return z(d.id); });

    // etc.append("text")
    //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    //     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.rate) + ")"; })
    //     .attr("x", 3)
    //     .attr("dy", "0.35em")
    //     .style("font", "13px sans-serif")
    //     .text(function(d) { return d.id; });


    // var timeLabel = etc.append("text")
        // .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        // .data(device)
        // .attr("y", height -10)
        // .attr("x", width - 40)
        // .attr("font-size", "40px")
        // .attr("opacity", "0.4")
        // .attr("text-anchor", "middle")
        // .text("1800")
        // .transition()
        // .duration(100)
        // .delay(1000)
        // .text(function(d,i){
        //   // console.log(d.values[i]);
        //   return d.values.date.getFullYear()});

// function update(data){
//
//     var t = d3.transition()
//         .duration(750);
//
//
//
// }

function tick(){


    x.domain([device[0].values[count].date-(86400*30E+3),device[0].values[count].date]);
    // y.domain([0,(d3.max(data) ? d3.max(data):1)]);



    d3.select(this)
        .attr("d",line)
        .attr("transform",null);


    axis.transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(x.axis);

    ydata.push({x:data[count].date,y:data[count].samsung});

    var count_ = count;
    // console.log(ydata);
    // console.log(count_);
    count = count < 59? ++count:count=0;
    // console.log(count);
    // console.log(data[count].date);
    // console.log(data[count]);


    // yaxis.transition()
    //     .duration(750)
    //     .ease(d3.easeLinear)
    //     .call(y.axis);

    d3.active(this)
        .attr("transform","translate("+(device[0].values[count].date-(86400*30E+3))+")")
        .transition()
        .on("start",tick);

    ydata.shift();
};



});





function type(d, _, columns) {

    d.date = parseTime(d.date);
    d.samsung = parseFloat(d.samsung)/100;  // rate %문자 제거, %비율

    // console.log(d);


    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];

    return d;
};
