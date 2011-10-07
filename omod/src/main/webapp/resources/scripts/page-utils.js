IPD={
		submit : function(thiz)
		{
			var t = jQuery("#tabs").tabs();
			var selected = t.tabs('option', 'selected');
			jQuery("#tab").val(selected);
			jQuery("#IpdMainForm").submit();
		}
};

ADMISSION={
		admit : function(id)
		{
			if(SESSION.checkSession())
			{
				url = "admission.htm?admissionId="+id+"&keepThis=false&TB_iframe=true&height=300&width=600";
				tb_show("Admission",url,false);
			}
		},
		removeOrNoBed : function(id,action)
		{
			if(SESSION.checkSession()){
				if(action == 1){
					if( confirm("Are you want to remove?"))
					{
						ACT.go("removeOrNoBed.htm?admissionId="+id+"&action="+1);
					}
				}else if(action == 2){
					if( confirm("Are you sure no bed for this patient?"))
					{
						ACT.go("removeOrNoBed.htm?admissionId="+id+"&action="+2);
					}
				}
			}
		}
};
QUEUE={
		load : function(url , container)
		{
			jQuery(container).load(url);
		},
		initTableHover : function()
		{
			jQuery("tr").each(function(){
				var obj = jQuery(this);
				if( obj.hasClass("evenRow") || obj.hasClass("oddRow") )
				{
					obj.hover(
							function(){obj.addClass("hover");},
							function(){obj.removeClass("hover");}
							);
				}
			});
		},
		refreshQueue : function()
		{
			jQuery("#Patients_for_admission").load("patientsForAdmissionAjax.htm?ipdWardString="+jQuery("#ipdWardString").val()+"&doctorString="+jQuery("#doctorString").val()+"&fromDate="+jQuery("#fromDate").val()+"&toDate="+jQuery("#toDate").val()+"&searchPatient="+jQuery("#searchPatient").val(), function(){	QUEUE.initTableHover(); });
		},
		refreshAdmittedQueue : function()
		{
			jQuery("#Admitted_patient_index").load("admittedPatientIndexAjax.htm?ipdWardString="+jQuery("#ipdWardString").val()+"&doctorString="+jQuery("#doctorString").val()+"&fromDate="+jQuery("#fromDate").val()+"&toDate="+jQuery("#toDate").val()+"&searchPatient="+jQuery("#searchPatient").val(), function(){	QUEUE.initTableHover(); });
		}
		
};	

ADMITTED = {
		transfer : function(id)
		{
			if(SESSION.checkSession())
			{
				
				var url = "transfer.htm?id="+id+"&keepThis=false&TB_iframe=true&height=500&width=1000";
				tb_show("Transfer",url,false);
			}
		},
		discharge: function(id)
		{
			if(SESSION.checkSession())
			{
				
				var url = "discharge.htm?id="+id+"&keepThis=false&TB_iframe=true&height=600&width=1000";
				tb_show("Discharge",url,false);
			}
		},
		print : function(id)
		{
			jQuery("#printArea"+id).printArea({mode: "popup", popClose: true, popTitle: "Support by HISP india(hispindia.org)"});
		},
		submitIpdFinalResult : function(){
			jQuery('#selectedDiagnosisList option').each(function(i) {  
				 jQuery(this).attr("selected", "selected");  
			}); 
			jQuery('#selectedProcedureList option').each(function(i) {  
				 jQuery(this).attr("selected", "selected");  
			}); 
			jQuery("#finalResultForm").submit();
		},
		onChangeDiagnosis : function(container, id, name)
		{
			if(container == 'diagnosis'){
				
				var exists = false;
				jQuery('#selectedDiagnosisList option').each(function(){
				    if (this.value == id) {
				        exists = true;
				        return false;
				    }
				});
				if(exists){
					alert('It\'s existed!');
					return false;
				}
				exists = false;
				jQuery('#availableDiagnosisList option').each(function(){
				    if (this.value == id) {
				        exists = true;
				        return false;
				    }
				});
				jQuery("#diagnosis").val("");
				if(exists){
					jQuery("#availableDiagnosisList option[value=" +id+ "]").appendTo("#selectedDiagnosisList");
					jQuery("#availableDiagnosisList option[value=" +id+ "]").remove();
				}else{
					jQuery('#selectedDiagnosisList').append('<option value="' + id + '">' + name + '</option>');
					if(confirm("Do you want also add this diagnosis to opd diagnosis?"))
					{
						jQuery.ajax({
							  type: 'POST',
							  url: 'addConceptToWard.htm',
							  data: {opdId: jQuery("#"+container).attr("title"), conceptId: id, typeConcept: 1}
							});
					}
				}
			}
			if(container == 'procedure'){
				var exists = false;
				jQuery('#selectedProcedureList option').each(function(){
				    if (this.value == id) {
				        exists = true;
				        return false;
				    }
				});
				if(exists){
					alert('It\'s existed!');
					return false;
				}
				exists = false;
				jQuery('#availableProcedureList option').each(function(){
				    if (this.value == id) {
				        exists = true;
				        return false;
				    }
				});
				jQuery("#procedure").val("");
				if(exists){
					jQuery("#availableProcedureList option[value=" +id+ "]").appendTo("#selectedProcedureList");
					jQuery("#availableProcedureList option[value=" +id+ "]").remove();
				}else{
					jQuery('#selectedProcedureList').append('<option value="' + id + '">' + name + '</option>');
					if(confirm("Do you want also add this procedure to opd procedure?"))
					{
						jQuery.ajax({
							  type: 'POST',
							  url: 'addConceptToWard.htm',
							  data: {opdId: jQuery("#"+container).attr("title"), conceptId: id, typeConcept: 2}
							});
					}
				}
			}
		}
		
};