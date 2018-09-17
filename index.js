const express=require("express");
const rp = require('request-promise');
const cheerio = require('cheerio'); 
const puppeteer = require('puppeteer');
const snappy=require("./src/snapshot/takeSnapshot");
const app=express();
const hideHeader=true;
const url='https://ee.co.uk/';
 
var options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body);
    }
};

function contentsOfHtml(cheerioObj,elementName){
    this.contents_of_section[elementName]=cheerioObj(elementName).text();
}



rp(options)
    .then(function ($) {
        var list_of_sections = [];
        var new_obj={};
        new_obj.contents_of_section={};

        
        $('.general-banner section').each(function(i, elem) {
            list_of_sections[i] = $(this).html();
        });
        
        list_of_sections.forEach(function(val,j){
            new_obj.section_number=j;
            $(val).find( ".general-banner__text--desktop" ).each(function(cntr,newVal) {
                let var1=cheerio.load(newVal);
                contentsOfHtml.call(new_obj,var1,'h1');
                contentsOfHtml.call(new_obj,var1,'h2');
                contentsOfHtml.call(new_obj,var1,'h3');
                contentsOfHtml.call(new_obj,var1,'h4');
                contentsOfHtml.call(new_obj,var1,'p');
              }); 
            console.log(new_obj);
        });
        snappy.takeSnapshot(url,hideHeader);
        
   }).catch(function (err) {
        console.log("Scraping Failed!" + err);
});
    

