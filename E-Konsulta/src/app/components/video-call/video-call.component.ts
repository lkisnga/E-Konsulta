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
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements AfterViewInit {

  private localStream: MediaStream;
  callInput: any;

  currentUser_id: string = "";
  remoteUser : any = [];

  currentUser : any = [];

  call_interval: boolean = false;

  audio = new Audio('assets/sounds/Call.mp3');

  timeLeft: number = 13;
  interval;

  @ViewChild('local_video') localVideo: ElementRef;
  @ViewChild('received_video') receivedVideo: ElementRef;
  constructor(
    public db : AngularFirestore,
    public afu : AuthService
  ) { }
  
  ngOnInit()
  {
    this.remoteUser = JSON.parse(localStorage.getItem('data'));
    this.currentUser_id = this.afu.get_UID();
    this.currentUser = JSON.parse(localStorage.getItem('Users'));
  }

  ngAfterViewInit(): void { 
    this.requestMediaDevices();
    this.db.firestore.collection('calls').where('offer.doctor_id','==',this.currentUser_id).
    where('offer.patient_id','==',this.remoteUser.uid).onSnapshot(snapshot=>{
      let changes = snapshot.docChanges();
      changes.forEach(e=>{
        if(e.type == 'modified')
        {
          console.log('modified!');
          clearInterval(this.interval);
          this.call_sound('accepted');
        }
      })
    })
  }
  private async requestMediaDevices():Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    //this.localVideo.nativeElement.srcObject = this.localStream;
    this.localStream.getTracks().forEach((track) => {
      pc.addTrack(track, this.localStream);
  });

  // Show stream in HTML video
  this.localVideo.nativeElement.srcObject = this.localStream;
    //this.pauseLocalVideo();
  }
  private remoteVideo()
  {
    pc.ontrack = this.handleTrackEvent;
  }

  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log(event);
    this.receivedVideo.nativeElement.srcObject = event.streams[0];
  }

  pauseLocalVideo():void{
    this.localStream.getTracks().forEach(track=>{
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
  }

  startLocalVideo():void{
    this.localStream.getTracks().forEach(track=>{
      track.enabled = true;
    });
    this.localVideo.nativeElement.srcObject = this.localStream;
  }
  //Create Call
  async Call(): Promise<void> {

    this.call_interval = true;
    setTimeout(() => {
      this.call_interval = false;
    }, 13000);
    this.callTimer();
    this.call_sound('call');

    this.remoteVideo();
    // Reference Firestore collections for signaling
      const callDoc = this.db.firestore.collection('calls').doc();
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');

      var user1 = ""; //doctor
      var user2 = ""; //patient
      if(this.remoteUser.role == 'patient')
      { 
        user1 = this.currentUser_id;
        user2 = this.remoteUser.uid;
      }
      else if(this.remoteUser.role == 'doctor')
      {
        user1 = this.remoteUser.uid;
        user2 = this.currentUser_id;
      }
    
      this.callInput = callDoc.id;
      // Get candidates for caller, save to db
      pc.onicecandidate = event => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };
      
      callDoc.update({
        doctor_id: user1,
        patient_id: user2,
      })
      // Create offer
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
      const offer = {
        doctor_id: user1,
        patient_id: user2,
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
    
      await callDoc.set({ offer });
    
      // Listen for remote answer
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });
    
      // Listen for remote ICE candidates
      answerCandidates.onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    }
    callTimer()
    {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 13;
          this.db.firestore.collection('calls').doc(this.callInput).delete().then(()=>{
            console.log('call deleted');
          });
          clearInterval(this.interval);
        }
      },1000)
    }
    call_sound(con)
    {
      if(con == 'call')
        this.audio.play();
      else
        this.audio.pause();
    } 
    end_call()
    {
      window.close();
      this.db.firestore.collection('calls').doc(this.callInput).delete().then(()=>{
        console.log('call deleted');
      });
    }
}
