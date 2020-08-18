import React from 'react'
import {Typography,Switch} from '@material-ui/core'
import styles from './SwitchButton.module.css'

const SwitchButton = ({changedarkmode,darktheme}) =>{
    return(
        <div className={styles.container}>
            <Typography style={{display:'inline-block',fontWeight:'700'}} variant="body1" component="p">Light</Typography>
            <Switch checked={darktheme} onChange={(a) => changedarkmode(a.target.checked)}></Switch>
            <Typography variant="body1" style={{display:'inline-block',fontWeight:'700'}} component="p">Dark</Typography>

        </div>
    )
}
export default SwitchButton;