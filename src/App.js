import React from 'react'
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';
import logo from './images/logo.PNG'
import {Chart,Cards,CountryPicker,SwitchButton} from './components/';
import styles from './App.module.css'
import {fetchData} from './api';
import {Paper} from '@material-ui/core'
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles'

class App extends React.Component{
    
    state ={
        data:{},
        country:'',
        darktheme:false
    }

    async componentDidMount(){

        const fetchedData = await fetchData();
        this.setState({
            data:fetchedData
        })
        // console.log(fetchedData)
    }
    changedarkmode = (bool) => {
       
        this.setState({
            darktheme:bool,
        })
    }

    handleCountryChange = async (country) =>{
        console.log(country)
        const fetchedData = await fetchData(country)
        console.log(fetchedData)
        this.setState({
            data:fetchedData,
            country:country
        })
    }



    render(){
        const {data,country,darktheme} = this.state;
        const theme = createMuiTheme({
            palette:{
                type: this.state.darktheme?'dark':'light'
            }
        })
        return(
            <ThemeProvider theme={theme}>
                <Paper>
                    <div className={styles.container}>
                        <img src={logo}  alt="Covid-19" />
                        <SwitchButton changedarkmode={this.changedarkmode} data={darktheme}/>
                        <Cards data={data}/>
                        <CountryPicker handleCountryChange={this.handleCountryChange}/>
                        <Chart data={data} country={country} />
                    </div>
                </Paper>
            </ThemeProvider>
        )
    }
}

export default App;
