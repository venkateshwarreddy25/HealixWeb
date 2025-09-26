const mongoose=require('mongoose');

const DoctorSchema=new mongoose.Schema({
    DName:String,
    Pname:String,
    Location:String,
    image:String,
    Bill:Number,
    Experience:String,
    Specalist:String,
    Technicians:String,
    Patience:String,
    Specialties:String,
    start: {
    type: Date,
    default: Date.now,   
    required: true
  },
  end: {
    type: Date,
    default: function() {
      return new Date(this.start.getTime() + 60 * 60 * 1000);  
    },
    required: true
  }
})

const Doctors=mongoose.model('Doctor',DoctorSchema);
DoctorSchema.pre('validate', function(next) {
  if (!this.end) {
    this.end = new Date(this.start.getTime() + 60 * 60 * 1000);
  }
  next();
});

module.exports=Doctors;