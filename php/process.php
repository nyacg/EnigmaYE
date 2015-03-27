<?php
if( isset($_POST) ){
    //form validation vars
    $formok = true;
    $errors = array();
    //submission data
    $ipaddress = $_SERVER['REMOTE_ADDR'];
    $date = date('Y-m-d');
    $time = date('H:i:s');
    //form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];
    $enquiry = $_POST['enquiry'];
    $message = $_POST['message'];
	//SQL table data
	$nametable = $_REQUEST['name'];
    $emailtable = $_REQUEST['email'];
    $telephonetable = $_REQUEST['telephone'];
    $enquirytable = $_REQUEST['enquiry'];
    $messagetable = $_REQUEST['message'];
    //validate form data
    //validate name is not empty
    if(empty($name)){
        $formok = false;
        $errors[] = "You have not entered a name";
    }
    //validate email address is not empty
    if(empty($email)){
        $formok = false;
        $errors[] = "You have not entered an email address";
    //validate email address is valid
    }elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $formok = false;
        $errors[] = "You have not entered a valid email address";
    }
    //validate message is not empty
    if(empty($message)){
        $formok = false;
        $errors[] = "You have not entered a message";
    }
    //validate message is greater than 20 characters
    elseif(strlen($message) < 20){
        $formok = false;
        $errors[] = "Your message must be greater than 20 characters";
    }
    //send email if all is ok
    if($formok){
		ini_set("sendmail_from","info@example.com");  
        $headers = "From: message@enigmaYE.com" . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $emailbody = "<p>You have received a new message from the enquiries form on your website.</p>
                      <p><strong>Name: </strong> {$name} </p>
                      <p><strong>Email Address: </strong> {$email} </p>
                      <p><strong>Telephone: </strong> {$telephone} </p>
                      <p><strong>Enquiry: </strong> {$enquiry} </p>
                      <p><strong>Message: </strong> {$message} </p>
                      <p>This message was sent from the IP Address: {$ipaddress} on {$date} at {$time}</p>";
        mail("robert.chandler@hppc.co.uk","New Enquiry",$emailbody,$headers);
		
		/*$con = mysql_connect("localhost","root","");
		if (!$con) {
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db("messageform", $con);
		$sql="INSERT INTO messages (date, time, name, email, telephone, enquity_type, message, ip_address) VALUES ('$date', '$time', '$nametable', '$emailtable', '$telephonetable', '$enquirytable', '$messagetable', '$ipaddress')";
		if (!mysql_query($sql,$con)){
			die('Error: ' . mysql_error());
		}
		mysql_close($con);*/
	}
    //what we need to return back to our form
    $returndata = array(
        'posted_form_data' => array(
            'name' => $name,
            'email' => $email,
            'telephone' => $telephone,
            'enquiry' => $enquiry,
            'message' => $message
        ),
        'form_ok' => $formok,
        'errors' => $errors
    );
    //if this is not an ajax request
    if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'){
        //set session variables
        session_start();
        $_SESSION['cf_returndata'] = $returndata;
        //redirect back to form
        header('location: ' . $_SERVER['HTTP_REFERER']);
    }
}
