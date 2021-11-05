'use strict'
let JSON = {
  "Madridian": {
    "penguins": [
      {
        "gender":"f",
        "cost":10000,
        "name":"Lolo"
      },
      {
        "gender":"f",
        "cost":10000,
        "name":"Pepe"
      }
    ],
    "options":false,
    "properties":null
  },
  "Katalonian": {
    "penguins": [
      {
        "gender":"f",
        "cost":15000,
        "name":"Dodo"
      },
      {
        "gender":"m",
        "cost":16000,
        "name":"Lala"
      },
      {
        "gender":"f",
        "cost":15000,
        "name":"Lele"
      },
      {
        "gender":"f",
        "cost":15000,
        "name":"Lulu"
      },
      {
        "gender":"m",
        "cost":16000,
        "name":"Dada"
      },
      {
        "gender":"m",
        "cost":16000,
        "name":"Kuku"
      },
      {
        "gender":"m",
        "cost":16000,
        "name":"Tutu"
      }            
      ],
      "options":true,
      "pr":null
  },
  "Gibraltarian": {
    "penguins": null,
    "options":false,
    "properties":[
      {
        "name":"добрый",
        "cost":18000                
      },
      {
        "name":"милый",
        "cost":19000                
      },
      {
        "name":"задумчивый",
        "cost":17000                
      },
      {
        "name":"преданный",
        "cost":18000                
      },
      {
        "name":"тюленчик",
        "cost":20000                
      },
      {
        "name":"зайка",
        "cost":23000                
      }
    ]
  }
}

let obj = {};
window.addEventListener("DOMContentLoaded", function(e) {
  // это для добавления товара в форму
  let kolvo_field = document.getElementById("kolvo");
  kolvo_field.addEventListener("input", function(ev) {
    obj["kolvo"] = ev.target.value;
    if(obj["options"] || obj["pr"]) {
      let summa = document.getElementById("summa");
      summa.innerHTML = obj["kolvo"] * obj["sum"];
     }
  })
  let selects = document.getElementsByClassName("type");
  Array.prototype.forEach.call(selects, function(select) {
    select.addEventListener("click", function(ev) {
      obj["options"] = JSON[ev.target.value];
      let summa = document.getElementById("summa");
      summa.innerHTML = 0;
      let del_div = document.getElementsByClassName("options");
      if(del_div.length != 0) {
        del_div[0].remove();
      }
      del_div = document.getElementsByClassName("props");
      if(del_div.length != 0) {
        del_div[0].remove();
      }
      if(obj["options"]["options"]) {
        let del_div = document.getElementsByClassName("options");
        if(del_div.length != 0) {
          del_div[0].remove();
        }
        let div = document.createElement("div");
        div.className="options";
        let inner = "";
        obj["options"]["penguins"].forEach((item)=> {
          inner += item.name + "<input type='radio' class='option_radio' name='option' value='" + item.cost + "'/><br>"
        })
        div.innerHTML = inner;
        let form = document.getElementById("par");
        form.appendChild(div);
        let radio_options = document.getElementsByClassName("option_radio");
        Array.prototype.forEach.call(radio_options, (option) => {
          option.addEventListener("click", (ev2)=> {
            obj["option"] = ev2.target.value;
            let sum = 0;
            obj["kolvo"] = document.getElementById("kolvo").value || document.getElementById("kolvo").getAttribute("placeholder");
            obj["sum"] = sum + obj["option"];
            sum = obj["sum"];
            sum *= obj["kolvo"];
            let summa = document.getElementById("summa");
            summa.innerHTML = sum;
          })
        })
      }
      else {
        if(obj["options"]["penguins"]) {
          obj["option"] = obj["options"]["penguins"][0].cost;
          obj["sum"] = obj["option"];
          obj["kolvo"] = document.getElementById("kolvo").value || document.getElementById("kolvo").getAttribute("placeholder");
          let sum = obj["sum"];
          sum *= obj["kolvo"];
          let summa = document.getElementById("summa");
          summa.innerHTML = sum;
        }
      }
      if(obj["options"]["pr"]) {
        let old_div = document.getElementsByClassName("props");
        if(old_div.length != 0){
          old_div[0].remove();
        }
        let div = document.createElement("div");
        div.className="props";
        let inner = "";
        obj["options"]["pr"].forEach((prop) => {
          inner +=  "<input type='checkbox' class='prop_check' name='prop_check' value='" + prop["name"] + "' data-cost='" + prop["cost"] + "'/>" + prop["name"];
          inner += "<br>";
        })
        div.innerHTML = inner;
        let form = document.getElementById("par");
        form.appendChild(div);
        let props_check = document.getElementsByClassName("prop_check");
        if(!obj["pr"]) {
          obj["pr"] = {};
        }
        Array.prototype.forEach.call(props_check, (check) => {
          check.addEventListener("click", function(ev3) {
            if(!ev3.target.checked) {
              delete obj["pr"][ev3.target.value];
            }
            else {
              obj["pr"][ev3.target.value] = ev3.target.dataset.cost; // dataset - безопасная передача пользовательских данных
            }
            obj["sum"] = 0;
            Object.keys(obj["pr"]).forEach((prop) => {
              obj["sum"] += Number(obj["pr"][prop]);
            })
            let sum = obj["sum"];
            obj["kolvo"] = document.getElementById("kolvo").value || document.getElementById("kolvo").getAttribute("placeholder");
            sum *= Number(obj["kolvo"]);
            let summa = document.getElementById("summa");
            summa.innerHTML = sum;
          })
        })
      }
    })
  })
});
