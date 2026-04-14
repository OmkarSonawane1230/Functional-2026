angular.module('hospitalApp')

.controller('HomeCtrl', ['$scope', 'AppointmentService', 'DoctorService',
  function ($scope, AppointmentService, DoctorService) {
    var all = DoctorService.getDoctors();
    $scope.totalAppointments = AppointmentService.count();
    $scope.totalDoctors = all.length;
    $scope.availableDoctors = all.filter(function (d) { return d.status === 'available'; }).length;
    $scope.featuredDoctors = all.slice(0, 4);
  }
])

.controller('DoctorsCtrl', ['$scope', 'DoctorService',
  function ($scope, DoctorService) {
    $scope.doctors = DoctorService.getDoctors();
    $scope.specializations = DoctorService.getSpecializations();
    $scope.searchText = '';
    $scope.selectedSpec = '';
    $scope.selectedStatus = '';

    $scope.doctorFilter = function (d) {
      var s = $scope.searchText.toLowerCase();
      return (!s || d.name.toLowerCase().indexOf(s) !== -1 || d.specialization.toLowerCase().indexOf(s) !== -1) &&
             (!$scope.selectedSpec || d.specialization === $scope.selectedSpec) &&
             (!$scope.selectedStatus || d.status === $scope.selectedStatus);
    };

    $scope.filteredCount = function () { return $scope.doctors.filter($scope.doctorFilter).length; };
    $scope.clearFilters = function () { $scope.searchText = $scope.selectedSpec = $scope.selectedStatus = ''; };
  }
])

.controller('BookAppointmentCtrl', ['$scope', 'DoctorService', 'AppointmentService',
  function ($scope, DoctorService, AppointmentService) {
    $scope.doctors = DoctorService.getDoctors().filter(function (d) { return d.status === 'available'; });
    $scope.todayStr = new Date().toISOString().split('T')[0];
    $scope.timeSlots = [
      '08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM',
      '11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM',
      '02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM'
    ];

    function blank() { return { patientName:'', age:'', gender:'', doctorId:'', doctorName:'', doctorSpec:'', date:'', time:'', notes:'' }; }
    $scope.appointment = blank();
    $scope.submitted = false;
    $scope.successMsg = '';
    $scope.errorMsg = '';

    $scope.onDoctorChange = function () {
      var d = DoctorService.getDoctorById($scope.appointment.doctorId);
      $scope.appointment.doctorName = d ? d.name : '';
      $scope.appointment.doctorSpec = d ? d.specialization : '';
    };

    $scope.isPastDate = function () {
      return $scope.appointment.date && new Date($scope.appointment.date) < new Date($scope.todayStr);
    };

    $scope.submitForm = function (form) {
      $scope.submitted = true;
      $scope.successMsg = $scope.errorMsg = '';
      if (form.$invalid || $scope.isPastDate()) { $scope.errorMsg = 'Please fix the errors above before submitting.'; return; }
      var saved = AppointmentService.add(angular.copy($scope.appointment));
      $scope.successMsg = 'Appointment confirmed. Your ID is ' + saved.id + '.';
      $scope.appointment = blank();
      $scope.submitted = false;
      form.$setPristine(); form.$setUntouched();
      window.scrollTo(0, 0);
    };
  }
])

.controller('AppointmentsCtrl', ['$scope', 'AppointmentService', 'DoctorService',
  function ($scope, AppointmentService, DoctorService) {
    $scope.timeSlots = [
      '08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM',
      '11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM',
      '02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM'
    ];

    function reload() { $scope.appointments = AppointmentService.getAll(); }
    reload();

    $scope.doctors = DoctorService.getDoctors();
    $scope.availableDoctors = $scope.doctors.filter(function (d) { return d.status === 'available'; });
    $scope.searchText = '';
    $scope.filterDoctor = '';
    $scope.todayStr = new Date().toISOString().split('T')[0];
    $scope.successMsg = '';
    $scope.confirmDelete = null;
    $scope.editMode = false;
    $scope.editAppt = null;
    $scope.editError = '';
    $scope.editSubmitted = false;

    $scope.apptFilter = function (a) {
      var s = $scope.searchText.toLowerCase();
      return (!s || a.patientName.toLowerCase().indexOf(s) !== -1 || a.id.toLowerCase().indexOf(s) !== -1 || a.doctorName.toLowerCase().indexOf(s) !== -1) &&
             (!$scope.filterDoctor || a.doctorName === $scope.filterDoctor);
    };

    $scope.filteredCount = function () { return $scope.appointments.filter($scope.apptFilter).length; };
    $scope.clearFilters = function () { $scope.searchText = $scope.filterDoctor = ''; };

    function flash(msg) {
      $scope.successMsg = msg;
      setTimeout(function () { $scope.$apply(function () { $scope.successMsg = ''; }); }, 3000);
    }

    $scope.deleteAppointment = function (id) { $scope.confirmDelete = id; };
    $scope.cancelDelete = function () { $scope.confirmDelete = null; };
    $scope.confirmDeleteAppt = function () {
      AppointmentService.remove($scope.confirmDelete);
      $scope.confirmDelete = null;
      reload();
      flash('Appointment deleted.');
    };

    $scope.isPastDate = function (date) { return date && new Date(date) < new Date($scope.todayStr); };

    $scope.editAppointment = function (appt) {
      $scope.editAppt = angular.copy(appt);
      $scope.editMode = true;
      $scope.editError = '';
      $scope.editSubmitted = false;
      setTimeout(function () { var el = document.getElementById('edit-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50);
    };

    $scope.cancelEdit = function () { $scope.editMode = false; $scope.editAppt = null; };

    $scope.onEditDoctorChange = function () {
      var d = DoctorService.getDoctorById($scope.editAppt.doctorId);
      if (d) { $scope.editAppt.doctorName = d.name; $scope.editAppt.doctorSpec = d.specialization; }
    };

    $scope.saveEdit = function (form) {
      $scope.editSubmitted = true;
      $scope.editError = '';
      if (form.$invalid || $scope.isPastDate($scope.editAppt.date)) { $scope.editError = 'Please fix the errors before saving.'; return; }
      AppointmentService.update($scope.editAppt);
      reload();
      $scope.editMode = false;
      $scope.editAppt = null;
      window.scrollTo(0, 0);
      flash('Appointment updated.');
    };
  }
]);
