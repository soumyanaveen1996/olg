// import React, { PureComponent } from "react";
// import {
//   checkSatelliteCall,
//   getSatelliteCallNumber,
//   getVoipToken,
//   PSTN_CALL
// } from "../../Services/VoipServices";
//
// class TelePhoneTest extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   componentDidMount() {
//     getVoipToken().then(token => {
//       let device = new window.Twilio.Device();
//       device.setup(token);
//       this.device = device;
//
//       device.on("incoming", conn => {
//         this.setState({ incomingConn: conn });
//       });
//
//       device.on("disconnect", conn => {
//         this.setState({
//           incomingConn: null,
//           onPhone: false,
//           incomingAccepted: false
//         });
//       });
//
//       device.on("error", () => {
//         this.setState({
//           incomingConn: null,
//           onPhone: false,
//           incomingAccepted: false
//         });
//       });
//     });
//   }
//
//   acceptCall = () => {
//     let conn = this.state.incomingConn;
//     conn.accept();
//     this.setState({ incomingAccepted: true });
//   };
//
//   disconnectCall = () => {
//     this.setState({ incomingConn: null });
//     this.device.disconnectAll();
//   };
//
//   handleToggleCall = async type => {
//     let device = this.device;
//
//     if (this.state.onPhone) {
//       device.disconnectAll();
//       this.setState({ onPhone: false });
//       return;
//     }
//
//     if (type === "phone" && this.state.phone) {
//       //todo E164
//       device.connect({
//         CallerId: "rajkumar@frontm.com",
//         To: this.state.phone
//       });
//       this.setState({ onPhone: "phone" });
//     } else if (type === "sat" && this.state.satPhone) {
//       console.log("sta");
//       console.log("sat");
//
//       const [call_type, pstnMessage] = checkSatelliteCall(this.state.satPhone);
//
//       if (call_type === PSTN_CALL.NOT_SUPPORTED) {
//         //todo show alert message
//         //    this.setState({ diallerState: DiallerState.initial });
//         //    Alert.alert(pstnMessage);
//         return;
//       }
//
//       if (call_type === PSTN_CALL.SAT_CALL) {
//         const {
//           error,
//           sat_phone_number,
//           sat_phone_pin,
//           phone_number
//         } = await getSatelliteCallNumber(this.state.satPhone);
//         if (error) {
//           //todo show message
//           // Alert.alert("Unable to Call number");
//           return;
//         }
//         let toNumber = `SAT:${sat_phone_number}:${sat_phone_pin}:${phone_number}`;
//         device.connect({
//           CallerId: "rajkumar@frontm.com",
//           To: `${toNumber}`
//         });
//         this.setState({ onPhone: "sat" });
//       }
//     } else {
//       device.connect({
//         To: `client:gnSzUFt5JnBtdLpTzakZbx`, //rajkumar.kell@gmail.com
//         CallerId: "rajkumar@frontm.com"
//       });
//       this.setState({ onPhone: "voip" });
//     }
//
//     //
//     // if (!this.state.onPhone) {
//     //   this.setState({
//     //     muted: false,
//     //     onPhone: true
//     //   });
//     //   // make outbound call with current number
//     //
//     //   this.setState({ log: "Calling " + n });
//     // } else {
//     //   // hang up call in progress
//     //   Twilio.Device.disconnectAll();
//     // }
//   };
//
//   render() {
//     let { incomingConn, incomingAccepted, onPhone } = this.state;
//     return (
//       <div
//         className="Catalog-contentarea"
//         style={{
//           background: "url('/offlinelms/img/welcomescreen-background.png')",
// backgroundSize: "cover",
// backgroundPosition: "center",
// backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div>
//           <div className="mt-4 d-flex justify-content-between">
//             <div className="d-flex flex-column mb-2">
//               <button
//                 className={
//                   "ml-3 btn " +
//                   (onPhone === "voip" ? "btn-danger" : "btn-primary")
//                 }
//                 onClick={() => {
//                   this.handleToggleCall("voip");
//                 }}
//               >
//                 {onPhone === "voip" ? "Disconnect" : "Make Voip Call"}
//               </button>
//             </div>
//
//             <div className="d-flex flex-column ml-4">
//               <input
//                 className="form-control mb-2"
//                 style={{ width: "200px" }}
//                 placeholder="Enter phone # without space"
//                 onChange={e => this.setState({ phone: e.target.value })}
//               />
//               <button
//                 className={
//                   "ml-3 btn " +
//                   (onPhone === "phone" ? "btn-danger" : "btn-info")
//                 }
//                 onClick={() => {
//                   this.handleToggleCall("phone");
//                 }}
//               >
//                 {onPhone === "phone" ? "Disconnect" : "Make Phone Call"}
//               </button>
//             </div>
//
//             <div className="d-flex flex-column mb-2 ml-4">
//               <input
//                 className="form-control mb-2"
//                 style={{ width: "220px" }}
//                 placeholder="Enter sat phone # without space"
//                 onChange={e => this.setState({ satPhone: e.target.value })}
//               />
//               <button
//                 className={
//                   "ml-3 btn " +
//                   (onPhone === "sat" ? "btn-danger" : "btn-warning")
//                 }
//                 onClick={() => {
//                   this.handleToggleCall("sat");
//                 }}
//                 disabled={this.props.disabled}
//               >
//                 {onPhone === "sat" ? "Disconnect" : "Make Sat Call"}
//               </button>
//             </div>
//           </div>
//
//           <div className="m-3">
//             Incoming voip calls would be accepted as well.
//           </div>
//
//           {incomingConn && (
//             <div className="mt-4">
//               <a className="btn btn-success" onClick={this.acceptCall}>
//                 Accept Incoming Call
//               </a>
//             </div>
//           )}
//
//           {incomingAccepted && (
//             <div className="mt-4">
//               <a className="btn btn-danger" onClick={this.disconnectCall}>
//                 Disconnect Received Call
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
//
// export default TelePhoneTest;
