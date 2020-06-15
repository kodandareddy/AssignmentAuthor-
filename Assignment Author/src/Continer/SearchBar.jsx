import React, { Component } from "react";
import Autosuggest from 'react-autosuggest';
import {actionGetResponse } from '../actions/ProductAction'
import { connect } from "react-redux";
//import SearchBar from "../../../../../Downloads/Microsoft.SkypeApp_kzf8qxf38zg5c!App/All/SearchBar";
let languages=[]

//global suggestions Object 
function getData(data){
languages=data
  
}
//check the special character
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


//returns the Suggestions
function getSuggestions(value,suggestion) {
  const escapedValue = escapeRegexCharacters(value.trim());
 const fixedData=suggestion
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return languages
    .map(section => {
      return {
        title: section.title? section.title :section.url,
        languages: section.languages.filter(language => regex.test(language.name))
      };
    })
    .filter(section => section.languages.length > 0);
}



//rendering the suggeston name
function getSuggestionValue(suggestion) {
  return suggestion.name;
}



//redering the individual suggestions
function renderSuggestion(suggestion) {
  return (
    suggestion.url ?<span>{suggestion.name +","  + " Url - " + suggestion.url }</span>:
    <span>{suggestion.name +","  + " artical name - " + suggestion.title }</span>
  );
}



//rendering the Title of suggestions
function renderSectionTitle(section) {
  return (
    <strong>{section.title?section.title:section.url }</strong>
  );
}

function getSectionSuggestions(section) {
  return section.languages;
}

class SearchBar extends React.Component {
  constructor() {
    super();
   
    this.state = {
      value: '',
      suggestions: []
    };    
  }
 
  componentDidMount(){
         this.formateData(this.props.newsData)
  }



  //changeing the object structure for to autoSuggestions
  formateData=({articles})=>{
        const article=articles.map(data=>{
          const a=[]
          a.push({name:data.author,title:data.title})
          return {title:"Authors",languages:a}
        })
        const data=articles.map(data=>{
          const a=[]
          a.push({name:data.source.name,url:data.url})
          return {url:"Site Name",languages:a}
        })
        const combinedArray=[...article,...data]
        getData(combinedArray)       

    }


  
  

  //Fetching the suggestions 
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };





  //clear all the suggestions on click on out side of suggestions
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { suggestions } = this.state;
    const{value,onChange}=this.props

    const inputProps = {
      placeholder: "Search Hear...",
      value,
      onChange
    };

    return (
      <Autosuggest 
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps} />
    );
  }
}


export default SearchBar