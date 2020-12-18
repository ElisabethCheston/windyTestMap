    //////
    //  load and save FP
    //  export rdfx and svfx
    //////

    let rdr=new FileReader();
    let rdrfiletype;
    let rdrfilename;
    let lookup=["Name","Desig","In_FP","Frequency","Nav_Freq","Elevation","Lat","Long","FUEL_CONS","TAS","TTRUE","HEIGHT","GSPD"];


    const rdfx=(f,cbfun)=>{       //f is provided by file input -- this.files
        console.log(f[0].name);
        rdrfilename=f[0].name.slice(0,-4);
        //document.getElementById("saveas").value=rdrfilename;
        if (f[0].name.search("ep1")>=0) {
            rdrfiletype="ep1";
            rdr.readAsText(f[0]);
        } else if (f[0].name.search("efp")>=0){
            rdrfiletype="efp";
            rdr.readAsArrayBuffer(f[0]);
        } if (f[0].name.search("gpx")>=0){
            rdrfiletype="gpx";
            rdr.readAsText(f[0]);
        }

        const findres=(s,field,i,b,e)=>{
            let ii=s.indexOf(field,i);
            if (ii>=0){
                let beg=s.indexOf(b,ii)+1;let end=s.indexOf(e,beg);
                return {str:s.slice(beg, end),i:end};
            } else return {str:"",i:-999}
        }

    /*let loadedPlan2FP=()=>{
        fpf.clearFP();
        loadedPlan.forEach((e,n)=>{
            console.log(e.coords,n,e.Waypoint,e.elev,e.des,e.Spd,e.Alt);
            fpf.addWPtoFP(e.coords,n,e.Waypoint,e.elev,e.des,e.Spd,e.Alt);
            fpf.recalcFPClearElev();
            updategmapPoly();
        });
        //fp=JSON.parse(JSON.stringify(loadedPlan));
        //fp.forEach(e=>{
        //    console.log(e.Waypoint);
        //    if(e.Waypoint==""){e.Waypoint=e.des;}
        //    else if(e.des=="")e.des=" ";
        //});
        fp.route=loadedPlan.route;
        console.log(fp);
    }*/

        rdr.onload=e=>{
            let loadedPlan=[];

            let s=rdr.result;

            let defhght=[];
            if (rdrfiletype=="ep1"){
                loadedPlan.start32bit=0;
                //find route name
                loadedPlan.route=findres(s,"Route",0,"'","'").str;
                //find defheight
                for (let i=0;i<360;i+=90)defhght.push(findres(s,"Height"+i,0,"="," ").str);
                //read wps
                let r=-1;
                let res;
                for (var i=0;i>=0;){
                    let maxi=-999;
                    lookup.forEach((st,ix)=>{
                        if (ix<6) {res=findres(s,st,i,"'","'")} else res=findres(s,st,i,"="," ");
                        if (res.i>maxi)maxi=res.i;
                        if (ix==0){r++;loadedPlan.push({});}
                        switch (st) {
                            case "Desig":           loadedPlan[r].Waypoint=res.str;         break;
                            case "Name":            loadedPlan[r].des=res.str;              break;
                            case "Frequency":       loadedPlan[r].freq=res.str;             break;
                            case "Elevation":       loadedPlan[r].elev=Math.round(10*Number(res.str)/3.28084)/10;   break;
                            case "Lat":             loadedPlan[r].coords={lat:-res.str};    break;
                            case "Long":            loadedPlan[r].coords.lng=Number(res.str);                       break;
                            case "FUEL_CONS":       loadedPlan[r].fuelc=Math.round(Number(res.str)*3.78541);        break;
                            case "TAS":             loadedPlan[r].Spd=res.str*0.514444;     break;  //convert knots to m/s.
                            case "TTRUE": if(r>0)   loadedPlan[r-1].TRK=res.str;            break;
                            case "HEIGHT":if(r>0)   loadedPlan[r-1].Alt=Math.round((Number(res.str)*100)/3.28084);  break;
                        }
                    });
                    i=maxi;
                }
                loadedPlan.pop();
                console.log(loadedPlan);
                cbfun(loadedPlan);
            } else if (rdrfiletype=="efp"){

                let fld;
                let ar = new Uint16Array(s); //words - short ints
                loadedPlan.start32bit=(new Uint32Array(s,0,1))[0];

                //initial 2 words:  ??? meaning  keep the same.
                let pos=2;
                let wpnum=ar[pos]; //waypoint number
                //console.log(wpnum);
                pos+=2;
                for (var i=0;i<wpnum;i++){

                    let desiglen=ar[pos]/2;  //length of designator
                    let desig="";
                    pos+=2;
                    for (var j=pos;j<pos+desiglen;j++)  desig+=String.fromCharCode(ar[j]);
                    //console.log("Desig",desig);
                    loadedPlan[i]={Waypoint:desig};
                    pos=j;

                    let nmlen=ar[pos]/2;  //length of name
                    let nm="";
                    pos+=2;
                    for (var j=pos;j<pos+nmlen;j++)    nm+=String.fromCharCode(ar[j]);
                    //console.log("name",nm);
                    loadedPlan[i].des=nm;
                    pos=j;


                    let dv=new DataView(s,pos*2,24);
                    for (var j=0;j<3;j++){
                        let res=dv.getFloat64(j*8,8,true);
                        if (j==0)       {loadedPlan[i].coords={lng:res};fld="lng";}
                        else if (j==1)  {loadedPlan[i].coords.lat=res; fld="lat";}
                        else {loadedPlan[i].elev=res;fld="elev in meters";}
                        //console.log(fld,res);
                    }
                    pos+=12;
                }
                let legnum=ar[pos];  //number of legs
                pos+=2;
                for (i=0;i<legnum;i++){
                    let dv=new DataView(s,pos*2,32);
                    for (j=0;j<4;j++){
                        let res=dv.getFloat64(j*8,8,true);
                        if (j==0){loadedPlan[i].Alt=res;fld="alt"}
                        else if (j==1){loadedPlan[i].Spd=res; fld="spd m/s"}
                        else if (j==2){loadedPlan[i].fuelc=res;fld="fuel l/h"}
                        else fld="blank";
                        //console.log(fld,res);
                    }
                    pos+=17;  //extra blank word at end of 16 words for 4 floats
                }
                //followed by 36 bytes of 0
                loadedPlan.route=(loadedPlan[0].des?loadedPlan[0].des:loadedPlan[0].Waypoint)+" to "+(loadedPlan[loadedPlan.length-1].des?loadedPlan[loadedPlan.length-1].des:loadedPlan[loadedPlan.length-1].Waypoint);
                console.log(loadedPlan,loadedPlan.length);
                //loadedPlan2FP();
                cbfun(loadedPlan);
            } else if (rdrfiletype=="gpx"){
                let loadedPlan=[];
                let parser = new DOMParser();
                let gpx_xml = parser.parseFromString(rdr.result, "text/xml");
                let c=gpx_xml.childNodes[0].childNodes;
                for (let i=0;i<c.length;i++){
                    if(c[i].nodeName=="wpt"){
                        loadedPlan.push({coords:{lat:c[i].attributes.lat.value,lng:c[i].attributes.lon.value}});
                    }
                }
                cbfun(loadedPlan);
            }
        }

    }


    const svfx=(ext)=>{
        ext=ext.slice(4);
        filename=document.getElementById("saveas").value;
        document.getElementById("savediv").style.display="none";

        console.log(filename,ext);
        let sv=(content,fnm)=>{
            //alert(mobile);
            console.log("save as ",fnm);
            let a = document.createElement("a");
            let file=new Blob([content])  ;
            let url = URL.createObjectURL(file);
            a.href = url;
            a.download = fnm;
            document.body.appendChild(a);
            a.click();

            if (mobile){
                alert("mobile");
                let savewin=window.open();
                savewin.document.write(
                "<script>alert('Saved');</script>"
                );
            }
        }

        if (ext=="ep1"){
            console.log(fp);
            let str="Route='"+fp.route+"'"+"\r\n";
            let l=fp.length;
            str+="NumberOfPoints="+l+"\r\n";
            for (let i=0;i<l;i++){
                let shiftup=i>0?i-1:0;
                str+=   "Name='"+fp[i].des+"' "+
                        "Desig='"+fp[i].Waypoint+"' "+
                        "In_FP='yes' In_EET='no' "+
                        "Frequency='"+(fp[i].freq||"")+"' "+
                        "Nav_freq='"+(fp[i].navfreq||"")+"' "+
                        "Elevation='"+Math.round((fp[i].elev||0)*3.28084)+"' "+
                        "Lat="+(-fp[i].coords.lat).toFixed(7)+" "+
                        "Long="+fp[i].coords.lng.toFixed(7)+" "+
                        "TAS="+((fp[shiftup].Spd||0)/0.514444).toFixed(7)+" "+
                        "FUEL_CONS="+((fp[shiftup].fuelc||0)/3.78541).toFixed(6)+" "+
                        "TTRUE="+(Number(fp[shiftup].TRK)||0).toFixed(7)+" "+
                        "HEIGHT="+(i==0?-2:Math.round(((fp[i-1].Alt||0)/100)*3.28084)).toFixed(7)+" "+
                        "\r\n";
            }
            console.log( str );
            sv(str,filename+"."+ext);
        } else if(ext=="efp" && fp.length){
            //calculate array length
            let l=fp.length;
            console.log(l);
            let n=46;
            for(let i=0;i<l;i++){
                console.log(fp[i].Waypoint.length,fp[i].des.length);
                n+= (fp[i].Waypoint.length)*2
                    +(fp[i].des.length)*2
                    +32;
            }
            n+=34*(l-1)

            console.log(n);

            console.log(loadedPlan);

            //write
            let buffer; let dv;
            buffer = new ArrayBuffer(n);
            dv = new DataView(buffer);
            let p=0;
            if (!loadedPlan.start32bit)loadedPlan.start32bit=15663106;
            console.log(loadedPlan.start32bit);
            dv.setUint32(p,loadedPlan.start32bit,true);         p+=4;
            dv.setUint32(p,l,true);                             p+=4;
            for (i=0;i<l;i++){
                let wpl=fp[i].Waypoint.length;
                dv.setUint32(p,wpl*2,true);                       p+=4;
                for (let j=0;j<wpl;j++){
                    dv.setUint16(p,fp[i].Waypoint.charCodeAt(j),true);  p+=2;
                }
                let desl=fp[i].des.length;
                dv.setUint32(p,desl*2,true);                      p+=4;
                 for (let j=0;j<desl;j++){
                    dv.setUint16(p,fp[i].des.charCodeAt(j),true);       p+=2;
                }
                dv.setFloat64(p,fp[i].coords.lng,true);         p+=8;
                dv.setFloat64(p,fp[i].coords.lat,true);         p+=8;
                dv.setFloat64(p,fp[i].elev,true);               p+=8;
            }
            dv.setUint16(p,l-1,true);                           p+=2;
            for (i=0;i<l-1;i++){
                dv.setUint16(p,0,true);                         p+=2;
                dv.setFloat64(p,fp[i].Alt?fp[i].Alt:0,true);    p+=8;
                dv.setFloat64(p,fp[i].Spd?fp[i].Spd:0,true);    p+=8;
                dv.setFloat64(p,fp[i].fuelc?fp[i].fuelc:0,true);p+=8;
                dv.setFloat64(p,0,true);                        p+=8;
            }
            /*for (i=0;i<11;i++){
                dv.setUint32(p,0,true);                         p+=4;
            }*/
            console.log(p);
            sv(buffer,filename+"."+ext);
        }
    }

    export default {rdfx,svfx};