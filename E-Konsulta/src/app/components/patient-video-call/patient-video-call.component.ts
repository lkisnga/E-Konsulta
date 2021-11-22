import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

const mediaConstraints = {
  audio: true,
  video: {width: 650, height: 400}
};

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

@Component({
  selector: 'app-patient-video-call',
  templateUrl: './patient-video-call.component.html',
  styleUrls: ['./patient-video-call.component.css']
})
export class PatientVideoCallComponent implements AfterViewInit{
  private localStream: MediaStream;
  private remoteStream : MediaStream;
  callInput: string ="";

  doctorInfo : any = [];
  currentUser_id : string = "";

  audio = new Audio('assets/sounds/Call.mp3');

  @ViewChild('local_video') localVideo: ElementRef;
  @ViewChild('received_video') receivedVideo: ElementRef;

  constructor(
    public db : AngularFirestore,
    public afu : AuthService
  ) { }
  ngAfterViewInit(): void {


    this.doctorInfo = JSON.parse(localStorage.getItem('data'));
    this.currentUser_id = this.afu.get_UID();


    var data;
    this.db.firestore.collection('calls').where('offer.doctor_id','==',this.doctorInfo.uid).
    where('offer.patient_id','==',this.currentUser_id).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        if(e.type == 'added')
        {
          console.log('exist!');
          this.call_sound('call');
        }
        else if(e.type == 'removed')
        {
          console.log('not exist!');
          this.call_end();
        }
        else
        {
          console.log('Modified!');
          this.call_sound('accepted');
        }
        data = e.doc.id;
      })
      this.callInput = data;
    })

    this.requestMediaDevices();
  }
  private async requestMediaDevices():Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
    //this.localVideo.nativeElement.srcObject = this.localStream;
    this.localStream.getTracks().forEach((track) => {
      pc.addTrack(track, this.localStream);
  });

  // Show stream in HTML video
  this.localVideo.nativeElement.srcObject = this.localStream;
    //this.pauseLocalVideo();
  }
  private async remoteVideo()
  {
    pc.ontrack = this.handleTrackEvent;
  }
  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log(event);
    this.receivedVideo.nativeElement.srcObject = event.streams[0];
  }
   //Answer Call
   async answerCall() {

    this.remoteVideo();
    const callId = this.callInput;
    const callDoc = this.db.firestore.collection('calls').doc(callId);
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');
  
    pc.onicecandidate = event => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };
  
    // Fetch data, then set the offer & answer
  
    const callData = (await callDoc.get()).data();
  
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
  
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);
  
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
  
    await callDoc.update({ answer });
  
    // Listen to offer candidates
  
    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change)
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };
  call_sound(con)
  {
    if(con =='call')
      this.audio.play();
    else
    {
      this.audio.pause();
      this.audio = new Audio('assets/sounds/Call.mp3');
    }
  }
  call_end()
  {
    const audio = new Audio('assets/sounds/callEnd.mp3');
    audio.play();
  }

}
