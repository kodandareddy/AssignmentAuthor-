import React, {
Component
} from "react";

//redux imports
import {
connect
} from "react-redux";
import {
actionGetResponse,
addAuther
} from "../actions/ProductAction";
//components imports
import Cards from "../components/data/Cards";
import SearchBar from "../Continer/SearchBar";
import Filters from '../components/data/Filters'
//moment import
import moment from "moment";
//uuid imports
import {
uuid
} from 'uuidv4';
//Auto Suggestion npm import
import Autosuggest from "react-autosuggest";
//bootstrap imports
import {
Container,
Row,
Col,
Spinner
} from "react-bootstrap";

class Home extends Component {
constructor(props) {
super(props);
this.state = {
newsData: [],
isFilter: false,
startDate: '',
authorName: "",
siteData: [],
selectedSiteName: null,
modifiedDate: '',
autoSearch: "",
autosuggestClicked: false
};
}

//Mounts at the time of component rendering for first time
componentDidMount() {
document.title ="Authors Data"
this.props.actionGetResponse().then(() => {
let responseData = [...this.props.newsData.articles]
responseData = responseData.map(data => {
return {
...data,
sourceUuid: uuid()
}
})
this.setState({
newsData: this.props.newsData.articles
}, () => {
this.formSiteData()
});

});
}

//Forming an object for ReactSelect to display the data in DropDown
formSiteData = () => {
const newsData = [...this.state.newsData]
let data = newsData.map(data => {
return {
value: data.source.name,
label: data.source.name
}
})

this.setState({
siteData: data
})
}

//onChange event of site dropDown
searchSiteName = (site) => {
this.setState({
selectedSiteName: site,
autosuggestClicked: false

});
};


//Date Fliter Function

handleDateChange = (date) => {
let modifiedDate = moment(date).format("YYYY-MM-DD");
this.setState({
startDate: date,
modifiedDate,
autosuggestClicked: false
});
};





//filters all the data

filteredList = () => {
let newData = [...this.state.newsData]
const {
modifiedDate,
selectedSiteName,
authorName,
autosuggestClicked,
autoSearch
} = this.state
if (autosuggestClicked) {
newData = newData.filter(item => (!autoSearch.includes('.com') && !autoSearch.includes('.org')) ?
item.author === autoSearch : item.source.name === autoSearch)
return newData
} else {
if (modifiedDate && modifiedDate !== "Invalid date")
newData = newData.filter((item) => moment(item.publishedAt).format("YYYY-MM-DD").includes(this.state.modifiedDate))
else if (selectedSiteName)
newData = newData.filter((item) => item.source.name === selectedSiteName.value)
else if (authorName.trim())
newData = newData.filter(item => {
return item.author ?
item.author.toLowerCase().includes(authorName.toLowerCase()) :
''
})

return newData
}

}


//input Fliter function
searchAuthorName = ({
target
}) => {
this.setState({
authorName: target.value,
autosuggestClicked: false
})
};



//onchange event for autoSuggest
onChange = (event, {
newValue,
method
}) => {
newValue ? this.setState({
autoSearch: newValue
}) : this.setState({
autoSearch: newValue,
autosuggestClicked: false
});
if (method === "click") {
alert('fafa')
this.setState({
autosuggestClicked: true
})
}

};




//gettting the onchange event of Auther Input
getIndividualAuther = (data) => {
this.props.history.push('/newsDetail')
this.props.addAuther(data)
}

closeFilter = () => {
this.setState({
isFilter: !this.state.isFilter,
autosuggestClicked: false
})
}



render() {
const { isFilter } = this.state;
const filteredData=this.filteredList()
if(this.state.newsData.length===0){

return(<>
  <Col className="text-center">
  <Spinner animation="border" role="status">
    <span className="sr-only">No Data Found</span>
  </Spinner>
  <h1>Loading...</h1>
  </Col>
</>
)
}
return (
<>
  <Container>
    <Row className="news-search-row">
      <Col className="pr-0">
      <SearchBar onChange={this.onChange} value={this.state.autoSearch} newsData={this.props.newsData} />
      </Col>
      <Col className="col-auto">

      <button type="button" className="btn btn-light filter-btn" onClick={()=> {
        this.setState({ isFilter: !this.state.isFilter, autosuggestClicked: false});
        }}
        >
        <i className="fa fa-filter" aria-hidden="true"></i>
        Filters
      </button>
      </Col>
      <Col xs={12}>
      {isFilter ? (
      <div className="filter-info">
        <Filters startDate={this.state.startDate} handleDateChange={this.handleDateChange}
          searchAuthorName={this.searchAuthorName} authorName={this.state.authorName} siteData={this.state.siteData}
          selectedSiteName={this.state.selectedSiteName} searchSiteName={this.searchSiteName}
          closeFilter={this.closeFilter} />
      </div>
      ) : (
      ""
      )}
      </Col>
    </Row>
  </Container>
  <Container>
    <Row className="news-card-row">

      <Cards getIndividualAuther={this.getIndividualAuther} newsData={filteredData} />
    </Row>
  </Container>
</>
);
}
}

const mapStateToProps = (state) => {
return {
newsData: state.reducer.newsInformation,
};
};

export default connect(mapStateToProps, {
actionGetResponse,addAuther
})(Home);