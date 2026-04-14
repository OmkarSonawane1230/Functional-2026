angular.module('hospitalApp')

.service('DoctorService', function () {
  var doctors = [
    { id: 1, name: 'Dr. Ananya Sharma', specialization: 'Cardiologist', experience: '12 years', availableDays: 'Mon, Wed, Fri', availableTime: '09:00 AM – 01:00 PM', status: 'available', initials: 'AS' },
    { id: 2, name: 'Dr. Rajesh Kumar', specialization: 'Neurologist', experience: '10 years', availableDays: 'Tue, Thu, Sat', availableTime: '10:00 AM – 02:00 PM', status: 'available', initials: 'RK' },
    { id: 3, name: 'Dr. Priya Nair', specialization: 'Pediatrician', experience: '8 years', availableDays: 'Mon, Tue, Wed', availableTime: '08:00 AM – 12:00 PM', status: 'available', initials: 'PN' },
    { id: 4, name: 'Dr. Suresh Mehta', specialization: 'Orthopedist', experience: '15 years', availableDays: 'Wed, Thu, Fri', availableTime: '11:00 AM – 03:00 PM', status: 'busy', initials: 'SM' },
    { id: 5, name: 'Dr. Kavita Reddy', specialization: 'Dermatologist', experience: '9 years', availableDays: 'Mon, Thu, Sat', availableTime: '09:00 AM – 01:00 PM', status: 'available', initials: 'KR' },
    { id: 6, name: 'Dr. Arun Pillai', specialization: 'Gastroenterologist', experience: '11 years', availableDays: 'Tue, Fri, Sat', availableTime: '10:00 AM – 02:00 PM', status: 'available', initials: 'AP' },
    { id: 7, name: 'Dr. Meena Joshi', specialization: 'Gynecologist', experience: '13 years', availableDays: 'Mon, Wed, Sat', availableTime: '08:00 AM – 12:00 PM', status: 'available', initials: 'MJ' },
    { id: 8, name: 'Dr. Vivek Rao', specialization: 'Ophthalmologist', experience: '7 years', availableDays: 'Tue, Thu, Fri', availableTime: '09:00 AM – 01:00 PM', status: 'busy', initials: 'VR' },
    { id: 9, name: 'Dr. Shalini Gupta', specialization: 'Psychiatrist', experience: '10 years', availableDays: 'Mon, Tue, Fri', availableTime: '02:00 PM – 06:00 PM', status: 'available', initials: 'SG' },
    { id: 10, name: 'Dr. Nikhil Verma', specialization: 'General Physician', experience: '6 years', availableDays: 'Mon–Sat', availableTime: '08:00 AM – 06:00 PM', status: 'available', initials: 'NV' }
  ];

  this.getDoctors = function () { return doctors; };
  this.getDoctorById = function (id) { return doctors.find(function (d) { return d.id === parseInt(id); }); };
  this.getSpecializations = function () {
    return doctors.map(function (d) { return d.specialization; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
  };
})

.service('AppointmentService', function () {
  var KEY = 'hospital_appointments';

  function load() { var r = localStorage.getItem(KEY); return r ? JSON.parse(r) : []; }
  function save(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
  function genId(list) {
    if (!list.length) { return 'APT-0001'; }
    var max = Math.max.apply(null, list.map(function (a) { return parseInt(a.id.replace('APT-', ''), 10); }));
    return 'APT-' + String(max + 1).padStart(4, '0');
  }

  this.getAll = function () { return load(); };
  this.count = function () { return load().length; };

  this.add = function (appt) {
    var list = load();
    appt.id = genId(list);
    appt.createdAt = new Date().toISOString();
    list.push(appt);
    save(list);
    return appt;
  };

  this.update = function (updated) {
    var list = load();
    var i = list.findIndex(function (a) { return a.id === updated.id; });
    if (i !== -1) { list[i] = updated; save(list); return true; }
    return false;
  };

  this.remove = function (id) { save(load().filter(function (a) { return a.id !== id; })); };
});
