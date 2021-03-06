<html>
<head>
  <title>OTP</title>
  <script type="text/javascript">/* <![CDATA[ */
    var encode_chars = new Array();
    encode_chars['A'] = '1';
    encode_chars['E'] = '2';
    encode_chars['I'] = '3';
    encode_chars['N'] = '4';
    encode_chars['O'] = '5';
    encode_chars['R'] = '6';
    encode_chars['B'] = '70';
    encode_chars['C'] = '71';
    encode_chars['D'] = '72';
    encode_chars['F'] = '73';
    encode_chars['G'] = '74';
    encode_chars['H'] = '75';
    encode_chars['J'] = '76';
    encode_chars['K'] = '77';
    encode_chars['L'] = '78';
    encode_chars['M'] = '79';
    encode_chars['P'] = '80';
    encode_chars['Q'] = '81';
    encode_chars['S'] = '82';
    encode_chars['T'] = '83';
    encode_chars['U'] = '84';
    encode_chars['V'] = '85';
    encode_chars['W'] = '86';
    encode_chars['X'] = '87';
    encode_chars['Y'] = '88';
    encode_chars['Z'] = '89';
    encode_chars[' '] = '90';
    encode_chars['.'] = '91';
    encode_chars[','] = '92';
    encode_chars[':'] = '93';
    encode_chars['?'] = '94';
    encode_chars['/'] = '95';
    encode_chars['('] = '96';
    encode_chars[')'] = '97';
    encode_chars['"'] = '98';
    encode_chars['!'] = '99';
    encode_chars['0'] = '00';
    encode_chars['1'] = '01';
    encode_chars['2'] = '02';
    encode_chars['3'] = '03';
    encode_chars['4'] = '04';
    encode_chars['5'] = '05';
    encode_chars['6'] = '06';
    encode_chars['7'] = '07';
    encode_chars['8'] = '08';
    encode_chars['9'] = '09';
    var decode_chars = new Array();
    var decode_tidyup = new Array();
    decode_chars['1'] = 'A';
    decode_chars['2'] = 'E';
    decode_chars['3'] = 'I';
    decode_chars['4'] = 'N';
    decode_chars['5'] = 'O';
    decode_chars['6'] = 'R';
    decode_chars['70'] = 'B';
    decode_chars['71'] = 'C';
    decode_chars['72'] = 'D';
    decode_chars['73'] = 'F';
    decode_chars['74'] = 'G';
    decode_chars['75'] = 'H';
    decode_chars['76'] = 'J';
    decode_chars['77'] = 'K';
    decode_chars['78'] = 'L';
    decode_chars['79'] = 'M';
    decode_chars['80'] = 'P';
    decode_chars['81'] = 'Q';
    decode_chars['82'] = 'S';
    decode_chars['83'] = 'T';
    decode_chars['84'] = 'U';
    decode_chars['85'] = 'V';
    decode_chars['86'] = 'W';
    decode_chars['87'] = 'X';
    decode_chars['88'] = 'Y';
    decode_chars['89'] = 'Z';
    decode_chars['90'] = ' ';
    decode_chars['91'] = '.';
    decode_chars['92'] = ',';
    decode_chars['93'] = ':';
    decode_chars['94'] = '?';
    decode_chars['95'] = '/';
    decode_chars['96'] = '(';
    decode_chars['97'] = ')';
    decode_chars['98'] = '"';
    decode_chars['99'] = '!';
    decode_chars['00'] = '###zero###'; decode_tidyup['###zero###'] = '0';
    decode_chars['01'] = '###one###'; decode_tidyup['###one###'] = '1';
    decode_chars['02'] = '###two###'; decode_tidyup['###two###'] = '2';
    decode_chars['03'] = '###three###'; decode_tidyup['###three###'] = '3';
    decode_chars['04'] = '###four###'; decode_tidyup['###four###'] = '4';
    decode_chars['05'] = '###five###'; decode_tidyup['###five###'] = '5';
    decode_chars['06'] = '###six###'; decode_tidyup['###six###'] = '6';
    decode_chars['07'] = '###seven###'; decode_tidyup['###seven###'] = '7';
    decode_chars['08'] = '###eight###'; decode_tidyup['###eight###'] = '8';
    decode_chars['09'] = '###nine###'; decode_tidyup['###nine###'] = '9';
    
    var random_otp_warning_given = false;    
    function random_otp() {
      var otp = '';
      for(var i = 0; i < 91; i++) {
        for(var j = 0; j < 5; j++) {
          otp += Math.floor(Math.random()*10);
        }
        if(i < 90) otp += ' ';
      }
      document.getElementById('otp').value = otp;
      if(!random_otp_warning_given) {
        alert('A pseudorandom OTP has been generated. THIS IS NOT SUITABLE FOR ACTUAL CRYPTOGRAPHIC USE (see blog post linked below for an explanation).');
        random_otp_warning_given = true;
      }
    }
    
    function encrypt() {
      // load vars and sanity check
      var input = document.getElementById('input').value.toUpperCase();
      var otp = document.getElementById('otp').value.replace(/[ \n]/g, '');
      if (!otp.match(/^[0-9]+$/)) {
        alert('Invalid OTP specified. OTP should consist of one or more numeric digits, usually in blocks of five digits seperated by spaces.')
        return false;
      }
      
       // numeralise input
      var numeralise = '';
      for (var i = 0; i < input.length; i++) {
        var str_len = 1;
        var push_i = 1;
        if((this_number = encode_chars[(character = input.charAt(i))]) == undefined) {
          alert("Encoding table does not specify an encoding for '" + character + "'. It has been replaced with '.'");
          this_number = encode_chars[(character = '.')];
        }
        
        // extend to a multiple of 5 chars
      var extend_by = (5 - (numeralise.length % 5)) % 5;
      for (var i = 0; i < extend_by; i++) {
        numeralise += '0';
      }
      // check otp length
      if ((too_short = numeralise.length - otp.length) > 0) {
        if(confirm('Your OTP is too short to encode this message (needs ' + too_short + ' more digits). You can continue to encrypt, but your encryption will be imperfect and could be cracked. Do you want to continue?')) {
          // multiply otp length
          while(otp.length < numeralise.length) otp += otp;
        } else {
          return false;
        }
      }
      // encrypt
      var output = '';
      for (var i = 0; i < numeralise.length; i++) {
        var num = parseInt(numeralise.charAt(i)) - parseInt(otp.charAt(i));
        if(num < 0) num += 10
        output += num;
      }
      // break output with spaces
      var output_split = '';
      for(var i = 0; i < output.length; i += 5) {
        output_split += output.substr(i, 5) + ' ';
      }
      
      // display output
      document.getElementById('output').value = output_split;
    }
    
    
    function decrypt() {
      var input = document.getElementById('input').value.replace(/[ \n]/g, '');
      var otp = document.getElementById('otp').value.replace(/[ \n]/g, '');
      // load vars and sanity check
      if (!input.match(/^[0-9]+$/)) {
        alert('Invalid input supplied. Input should consist of one or more numeric digits, usually in blocks of five digits seperated by spaces.')
        return false;
      }
      if (!otp.match(/^[0-9]+$/)) {
        alert('Invalid OTP specified. OTP should consist of one or more numeric digits, usually in blocks of five digits seperated by spaces.')
        return false;
      }
      // check otp length
      if ((too_short = input.length - otp.length) > 0) {
        alert('Your OTP is too short to be a complete key for this message (needs ' + too_short + ' more digits). This OTP could be correct, but if it is, the key may have been broken and the message intercepted.')
        while(otp.length < input.length) otp += otp;
      }
      // decrypt
      var output = '';
      for (var i = 0; i < input.length; i++) {
        var num = parseInt(input.charAt(i)) + parseInt(otp.charAt(i));
        if(num > 9) num -= 10
        output += num;
      }
      
      // denumeralise
      var output_denum = '';
      var pos = 0;
      var len = 1;
      while(pos + len <= output.length) {
        var chars = output.substr(pos,len);
        if((decode_char = decode_chars_and_codebook[chars]) != undefined) {
          output_denum += decode_char;
          pos += len;
          len = 1;
        } else {
          len++;
        }
      }
      // fix numbers etc.
      for (var key in decode_tidyup) {
        var value = decode_tidyup[key];
        output_denum = output_denum.replace(new RegExp(key, 'g'), value);
      }
      // display output
      document.getElementById('output').value = output_denum;
    }
    function sample(input, otp) {
      document.getElementById('input').value = input;
      document.getElementById('otp').value = otp;
      return false;
    }
    
    function start_otp() {
      var page_content  = '<h1>One-Time Pad Encoder/Decoder In Javascript</h1>;
      page_content += '</textarea></p></div><div id="otp_panel"><p>Input:<br /><textarea id="input">99113 59099 11290</textarea></p><p>OTP:<br /><textarea id="otp">00000 00000 00000</textarea></p><p><input type="button" value="Encrypt" onclick="encrypt();" /> <input type="button" value="Decrypt" onclick="decrypt();" /> <input type="button" value="Generate Pseudorandom OTP" onclick="random_otp();" /></p><p>Output:<br /><textarea id="output"></textarea></p></div>';
      document.body.innerHTML = page_content;
    }
      
 /* ]]> */</script>
 <style type="text/css">
    div#otp_panel {
      width: 60%;
      padding-right: 0.5em;
    }
    
    textarea {
      width: 90%;
      border: 1px solid #555;
    }
  
    div#otp_panel textarea {
      height: 10em;
    }
  </style>
</head>
<body onload="start_otp();">
  Loading OTP.<br />
  If this message doesn't go away, you may need to enable Javascript in your web browser, or perhaps there's a bug. ;-)
</body>
