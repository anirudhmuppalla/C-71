import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase'
import db from '../config'
export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:'normal',
            scannedBookID:'',
            scannedStudentID:''
        }
    }
    getCameraPermissions=async(ID)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            buttonState:'ID',
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scanndeData:data,
            buttonState:'normal'
        })
    }

    handleTransaction=()=>{
        var transactionMessage
        db.collection("books").doc(this.state.scannedBookID).get()
        .then((doc)=>{
            console.log(doc.data())
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState
        if(buttonState!=="normal"&& hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                 style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState==='normal'){
        
     return(
        <View style={
            styles.container
        }>
            <View>
                <Image 
                source={require('../assets/booklogo.jpg')}
                style={{width:200,height:200}}/>
                <Text style={{textAlign:'center',fontSize:30}}>
                    Wily
                </Text>
            </View>
         <View style={
        styles.inputView
    }>
         <TextInput style={styles.inputBox}
         placeholder='bookID'
         value={this.state.scannedBookID}/>
         <TouchableOpacity style={styles.scanButton}
         onPress={()=>{
             this.getCameraPermissions('bookID')
         }}>
             <Text style={styles.buttonText}>scan</Text>
         </TouchableOpacity>
         
    </View>
    <View style={
        styles.inputView
    }>
         <TextInput style={styles.inputBox}
         placeholder='studentID'
         value={this.state.scannedStudentID}/>
         <TouchableOpacity style={styles.scanButton}
         onPress={()=>{
            this.getCameraPermissions('studentID')
         }}>
             <Text style={styles.buttonText}>scan</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.scanButton}
         onPress={(async)=>{
           this.handleTransaction
         }}>
             <Text style={styles.buttonText}>submit</Text>
         </TouchableOpacity>
         
    </View>
    </View>
     )
    }
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'red',
        padding:10,
        margin:10
    },
    inputView:{
        flexDirection: 'row',
        margin:20
    },
    inputBox:{
        backgroundColor:"beige",
        height:50,
        width:200,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
    },
    buttonText:{
        fontSize:15,
        textAlign:'center',
        marginTop:10
    }
  });