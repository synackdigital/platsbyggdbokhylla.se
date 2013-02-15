load('application');

before(loadDrawing, {only: ['show', 'edit', 'update', 'destroy']});
skipBeforeFilter('protect from forgery',['create']);
skipBeforeFilter('auth',['create','show']);

action('new', function () {
    this.title = 'New drawing';
    this.drawing = new Drawing;
    render();
});

action(function create() {
    var theDraw = req.body.Drawing;
    theDraw.createDate = new Date();
    theDraw.updateDate = new Date();
    var questionaire = JSON.parse(theDraw.questionaire);
    if(Object.keys(questionaire).length==0){
        questionaire.answered = false;
    } else {
        questionaire.answered = true;
    }
    theDraw.questionaire = JSON.stringify(questionaire);
    Drawing.create(theDraw, function (err, drawing) {
        send({id:drawing.id});
        return;
        respondTo(function (format) {
            format.html(function(){
                if (err) {
                    flash('error', 'Drawing can not be created');
                    render('new', {
                        drawing: drawing,
                        title: 'New drawing'
                    });
                } else {
                    flash('info', 'Drawing created');
                    redirect(path_to.drawings());
                }
            });
            format.json(function () {
                send({id:drawing.id});
            }.bind(this));
        });
    });
});

action(function index() {
    this.title = 'Drawings index';
    Drawing.all({order:"createDate DESC"},function (err, drawings) {
        console.log()
        render({
            drawings: drawings
        });
    });
});

action(function show() {
    this.title = 'Drawing show';
    respondTo(function (format) {
        format.html(function(){
            if(this.drawing.questionaire.length>2){
                this.questionaire = JSON.parse(this.drawing.questionaire);        
            } else {
                this.questionaire = {};
            }
            var drawing = this.drawing;
            var data = JSON.parse(drawing.data);
            var kapnota = {};
            kapnota.modell = data.modell;
            kapnota.sektioner = 0;
            kapnota.overbyggnader = 0;
            kapnota.breddyttermatt = 0;
            kapnota.sektionlist = [];
            kapnota.overbygglist = [];

            for(var i = 0; i < data.order.length; i++){
                var sek = data.order[i];
                var sekObj = {};                
                if(sek.type=="over"){
                    kapnota.overbyggnader++;
                    sekObj.index = kapnota.overbyggnader;
                    kapnota.overbygglist.push({
                        w:0
                    });
                } else {
                    kapnota.sektioner++;
                    sekObj.index = kapnota.sektioner;
                    if(kapnota.modell=="ribersborg"){
                        kapnota.hojdyttermatt = sek.h;
                        var gavel = sek.col+1;
                        sekObj.h1 = {
                            bredd:(sek.w-(gavel*22))/sek.col,
                            djup:300,
                            antal:sek.col*2,
                            tjocklek:22
                        }
                        sekObj.h2 = {
                            bredd:(sek.w-(gavel*22))/sek.col,
                            djup:284,
                            antal:sek.col*(sek.row-1),
                            tjocklek:22
                        }
                        sekObj.g1 = {
                            hojd:sek.h-15,
                            djup:302,
                            antal:gavel,
                            tjocklek:22
                        }
                        sekObj.bakstycke = {
                            bredd:sekObj.h1.bredd+10,
                            hojd:sek.h - sek.sockel + 34,
                            antal:sek.col,
                            tjocklek:4
                        }
                        sekObj.sockel = {
                            bredd:sekObj.h1.bredd,
                            hojd:sek.sockel,
                            antal:sek.col,
                            tjocklek:22
                        }
                        sekObj.fastbrada = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        kapnota.sektionlist.push(sekObj);
                    }
                    if(kapnota.modell=="davidhall"){
                        kapnota.hojdyttermatt = sek.h;
                        var gavel = sek.col+1;
                        sekObj.h1 = {
                            bredd:(sek.w-(gavel*32))/sek.col,
                            djup:302,
                            antal:sek.col,
                            tjocklek:22
                        }
                        sekObj.h2 = {
                            bredd:(sek.w-(gavel*32))/sek.col,
                            djup:284,
                            antal:(sek.row-1),
                            tjocklek:22
                        }
                        sekObj.g1 = {
                            hojd:sek.h-790,
                            djup:302,
                            antal:gavel,
                            tjocklek:32
                        }
                        sekObj.bakstycke = {
                            bredd:sekObj.h1.bredd+10,
                            hojd:(sek.h - 790) - 12,
                            antal:sek.col,
                            tjocklek:4
                        }
                        sekObj.sockel = {
                            bredd:sekObj.h1.bredd,
                            hojd:sek.sockel,
                            antal:sek.col,
                            tjocklek:22
                        }
                        sekObj.fastbrada = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }


                        sekObj.tacksida = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        sekObj.skapsgavel = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        sekObj.bottenplatta = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        sekObj.hpskap = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        sekObj.ribbor = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        sekObj.hpskap = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        sekObj.bakstyckeskap = {
                            bredd:sekObj.h1.bredd,
                            hojd:60,
                            antal:sek.col,
                            tjocklek:16
                        }
                        

                        kapnota.sektionlist.push(sekObj);
                    }
                }
                kapnota.breddyttermatt+=sek.w;
            }

            drawing.kapnota = kapnota;
            render();
        }.bind(this));
        format.json(function () {
            var drawing = this.drawing;
            drawing.data = JSON.parse(drawing.data);
            send(drawing);
        }.bind(this));
    }.bind(this));
});

action(function edit() {
    this.title = 'Drawing edit';
    render();
});

action(function update() {
    this.drawing.updateAttributes(body.Drawing, function (err) {
        respondTo(function (format) {
            format.html(function(){
                if (!err) {
                    flash('info', 'Drawing updated');
                    redirect(path_to.drawing(this.drawing));
                } else {
                    flash('error', 'Drawing can not be updated');
                    this.title = 'Edit drawing details';
                    render('edit');
                }
            });
            format.json(function () {
                send({id:params.id});
            }.bind(this));
        });
    }.bind(this));
});

action(function destroy() {
    this.drawing.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy drawing');
        } else {
            flash('info', 'Drawing successfully removed');
        }
        send("'" + path_to.drawings() + "'");
    });
});

function loadDrawing() {
    Drawing.find(params.id, function (err, drawing) {
        if (err || !drawing) {
            redirect(path_to.drawings());
        } else {
            this.drawing = drawing;
            next();
        }
    }.bind(this));
}
