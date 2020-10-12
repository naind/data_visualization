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


    var device = data.columns.slice(1).map(function(id) {  // close 부터 id 추출
        return {
            id: id,
            values: data.map(function(d) {
                return {date: d.date, rate: d[id]};
                })
            };
        });

        var num = 0;
        var MM = device[0].values[num].date.getMonth() ;
        var DD = device[0].values[num].date.getDate() ;
        var HH = device[0].values[num].date.getHours() ;
        var SS = device[0].values[num].date.getSeconds();

        var MM3 = device[0].values[num+30].date.getMonth() ;
        var DD3 = device[0].values[num+30].date.getDate() ;
        var HH3 = device[0].values[num+30].date.getHours() ;
        var SS3 = device[0].values[num+30].date.getSeconds();


        var nn = new Date(2020, MM, DD, HH, SS);
        var nn3 = new Date(2020, MM3, DD3, HH3, SS3);

    var n = 240,
        duration = 10800,
        count = 0,
        ydata = d3.range(n).map(function(){return {x:0,y:0}});


var x = d3.scaleTime()
        // .domain([new Date(device[0].values[30].date - (n-2) * duration), new Date( device[0].values[30].date - duration)])  // extent data내 최소,최댓값을 x축에 그림
        // new Date(device[0].values[0].date +(n-1+count)*duration), new Date( device[0].values[30].date + count * duration)
        .domain([new Date(device[0].values[0].date), new Date( device[0].values[30].date)]  )  //  오래된 날짜를 기준으로, 30일전부터 기준날짜까지
        .range([0, width]);



    var y = d3.scaleLinear()
        .domain([-0.3,0.3])
        .range([height, 0]);

    var z = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(device.map(function(c) { return c.id; }));


    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d,i) {
// console.log(d.x);
// console.log(x(d.x));
          return x(d.x) })
          // return x(data[count].date); })
        .y(function(d,i) {
            // console.log(data[count].samsung);
            // return y(data[count].samsung); });
            // return y((data[count].samsung).format(formatPercent)); });
              // console.log((d.y*100).toFixed(0));
              // console.log(y(d.y));
              // console.log(d.y);
              return y(d.y+0.004) });
// toFixed(1)

// X, Y축, 중간라인 설정
var axis = g.append("g")
        .attr("class","grid")
        .attr("transform", "translate(0," + height + ")")
        .call(x.axis = d3.axisBottom(x)
                  .tickSize(-height));

    g.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
                .tickSize(-width)
                .tickFormat(formatPercent)
              )
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 15)
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("rate %")
        .style("font","13px sans-serif")
        .style("fill","white");

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
        .duration(100)
        .ease(d3.easeLinear)
        .on("start",tick);




//라인, 텍스트 설정
    var etc = g.selectAll(".etc")
        .data(device)
        .enter()
        .append("g")
        .attr("class", "etc");

    etc.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values ); })
        .style("stroke", function(d) { return z(d.id); });

    etc.append("text")
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.rate) + ")"; })
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "13px sans-serif")
        .text(function(d) { return d.id; });
    //
    //
    // var timeLabel = etc.append("text")
    //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    //     .data(device)
    //     .attr("y", height -10)
    //     .attr("x", width - 40)
    //     .attr("font-size", "40px")
    //     .attr("opacity", "0.4")
    //     .attr("text-anchor", "middle")
    //     .text("1800")
    //     .transition()
    //     .duration(100)
    //     .delay(1000)
    //     .text(function(d,i){
    //       // console.log(d.values[i]);
    //       return d.values.date.getFullYear()});



var check = device[0].values[0].date;

var num = 0;
var MM = device[0].values[num].date.getMonth() ;
var DD = device[0].values[num].date.getDate() ;
var HH = device[0].values[num].date.getHours() ;
var SS = device[0].values[num].date.getSeconds();

var MM3 = device[0].values[num+30].date.getMonth() ;
var DD3 = device[0].values[num+30].date.getDate() ;
var HH3 = device[0].values[num+30].date.getHours() ;
var SS3 = device[0].values[num+30].date.getSeconds();
// console.log(count);
// console.log("num:"+num)
// console.log(nn)
// console.log(nn3)

var temp =0;
var temp0 =0;
var nn = new Date(2020, MM, DD, HH, SS);
var nn3 = new Date(2020, MM3, DD3, HH3, SS3);


// console.log(check);

// console.log(nn);
// console.log(nn3);

// console.log(new Date(nn+ duration));
// console.log( new Date(device[0].values[0].date.setSeconds(nn.getSeconds() + duration ))) ;
// console.log(nn);

function tick(){



    num += (count%8 == 0)? 1: 0;
    if (count%8 == 0){
      MM = device[0].values[num].date.getMonth() ;
      DD = device[0].values[num].date.getDate() ;
      HH = device[0].values[num].date.getHours() ;
      SS = device[0].values[num].date.getSeconds();

      MM3 = device[0].values[num+29].date.getMonth() ;
      DD3 = device[0].values[num+29].date.getDate() ;
      HH3 = device[0].values[num+29].date.getHours() ;
      SS3 = device[0].values[num+29].date.getSeconds();
      // console.log(count);
      // console.log("num:"+num)



      nn = new Date(2020, MM, DD, HH, SS);
      nn3 = new Date(2020, MM3, DD3, HH3, SS3);


    };

    x.domain([temp =new Date(nn.setSeconds(nn.getSeconds()+ duration)), temp0 = new Date(nn3.setSeconds(nn3.getSeconds()+ duration)) ]);


// console.log(temp);
// console.log(temp0);
// console.log(count);


    d3.select(this)
        .attr("d",line)
        .attr("transform",null)
        // .style("stroke", function(d) { return z(d.id); });
        // .style("stroke", function(d) { return z(d.id); });


    axis.transition()
        .duration(100)
        .ease(d3.easeLinear)
        .call(x.axis);

// console.log(parseInt(count/8));
// var k = parseInt(count/8);
// console.log(i);
if (count > 7 ){

  ydata.push({x: temp0 ,y:data[parseInt((count+1)/8)+30].samsung})
} else if( count == 7){
  ydata.push({x: temp0 ,y:data[31].samsung})
} else {
  ydata.push({x: temp0 ,y:data[30].samsung})
}


  // console.log(nn)
  // console.log(nn3)


// console.log(data[parseInt(count/8)].samsung);

        // console.log(ydata);
    //   if (count >= 121){
    //
    //   ydata.push({x:0,y:0})
    // }else {
    //   ydata.push({x:data[count].date,y:data[count].samsung})
    // }




    // console.log(ydata);
    if (count < 728){ ++count };

    // console.log(count);
    // console.log(data[count].date);
    // console.log(data[count]);


    // yaxis.transition()
    //     .duration(750)
    //     .ease(d3.easeLinear)
    //     .call(y.axis);

    d3.active(this)
        // .attr("transform","translate("+( x(nn.setSeconds(nn.getSeconds()+ duration)) )+")")
        .transition()
        .on("start",tick);


    ydata.shift();

};



});





function type(d, _, columns) {


    d.date = parseTime(d.date);
    d.samsung = parseFloat(d.samsung)/100;  // rate %문자 제거, %비율

    // console.log(d.date);


    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];

    return d;
};
