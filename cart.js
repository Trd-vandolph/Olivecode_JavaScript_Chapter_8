/**
 * 
 */
	   $("document").ready(function(){
		   //
		   compute();
		   //
		   $("#showMenu").click(function(){
			   var x = $("#display").css("margin-left"); 
			   if(x == "140px"){$("#display").animate({"margin-left":"0"});}
			   else{$("#display").animate({"margin-left":"140px"});}
		   });
		   //
		   $("#addToCart").click(function(){
// 			   alert("u click on home"); 
			   updateTable();
		   });
		   //
		   $("#bags").click(function(){
// 			   alert("u click on bags");
                currentCategory = "bags";
                $("#items").html("");
                $("table").find("tr:gt(0)").remove();
                $("#totalAmt").html("0");
                startListNumber = 0;
                stopListNumber = 5; 
			    bags();
		   });
		   //
		   $("#shoes").click(function(){
// 			   alert("u click on shoes");
               currentCategory = "shoes";
               $("#items").html("");
               $("table").find("tr:gt(0)").remove();
               $("#totalAmt").html("0");
               startListNumber = 0;
               stopListNumber = 5; 
			   shoes();
		   });
		   //
		   $("#showMore").click(function(){
			   //this is working for both the categories 
			   if(currentCategory == "bags"){bags();}
			   else{shoes();}
		   });
		   //
		   var orderProduct = "";
           var price = 0;
		   function compute(){
		   $("input").click(function(){
//             alert("after click");;
               orders = $("input");
               var items=$("span");
               orderProduct = "";
               price = 0;
               
               for(i=0;i<orders.length;i++){
                   if(orders[i].checked){
                	   price = price + parseFloat(orders[i].value);
//                 	   alert(items[i].innerHTML);
                	   //building table rows for all selected items
                	   orderProduct = orderProduct + "<tr><td>"+items[i].innerHTML+"</td><td>"+parseFloat(orders[i].value)+"</td></tr>";
                	}
               }
           });
		   };
		   //
		   function bags(){
// 			   alert("i am from bags()");
			   $.ajax({
				   type: "GET",
				   url: "../htmlFiles/items.html",
				   success: function(html){
					   var a = $(html);
// 					   alert(html);
	                      var b = a.find("div#cat1");
// 	                      alert(b);
	                      var c = b.slice(startListNumber, stopListNumber);
// 	                      alert(c);
	                      showHide();
	                      $("#items").append(c);
	                      startListNumber += 5;
	                      stopListNumber += 5; 
	                      compute();
				   },
				   
			   });  
		   };
		   //
		   function shoes(){
			   $.ajax({
                   type: "GET",
                   url: "../htmlFiles/itemsShoes.html",
                   success: function(html){
                       var a = $(html);
//                     alert(html);
                          var b = a.find("div#cat2");
//                        alert(b);
                          var c = b.slice(startListNumber, stopListNumber);
//                        alert(c);
                          showHide();
                          $("#items").append(c);
                          startListNumber += 5;
                          stopListNumber += 5;   
                          compute();
                   },
                   
               });  
		   };
		   //
		   function showHide(){
			   $("#displayBody").html("");
               $("h2").hide();
               $("p").hide();
               $("#showMore").show();
               $("#addToCart").show();
		   };
		   //
		   function updateTable(){
			 //remove all table rows except header
               $("table").find("tr:gt(0)").remove();
             //add all the current selected items
               $("table").append(orderProduct);
               $("#totalAmt").html(price);
		   }
		   //
	   })