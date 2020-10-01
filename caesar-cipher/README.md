# Caesar Cipher CLI

- [ Task Description](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool)
- [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)

## Options

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**IMPORTANT!!!**
**To start using this Caesar Cipher CLI:**
- go to the "/caesar-cipher" folder. All commands must be run from this folder.
- run "npm install" in the "/caesar-cipher" folder.

**Details:**
1. For command-line arguments this interface uses
   [https://www.npmjs.com/package/commander](https://www.npmjs.com/package/commander)
2. "Commander" sends an error to _process.stderr_ and exits with code 1, if _action_ (encode/decode) or the _shift_ is missing. **ex.:** error: required option '-a, --action <type>' not specified
3. If the input file is missed _stdin_ is an input source.
4. If the output file is missed _stdout_ is an output destination.
5. If the input and/or output file is given but doesn't exist or you can't read it (e.g. because of permissions or it is a directory) - human-friendly error will be printed in _stderr_ and CLI exits with code 1.
6. If passed params are fine the output (file or stdout) contains encoded/decoded content of input (file or stdin).
7. For encoding/decoding only the English alphabet is used, all other characters will be kept untouched.

**Usage example:**

1. **All options exist and valid (could use short or long option names), action is encode**
  ```bash
  $ node caesar-cipher-cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
  ```
  or
  ```bash
  $ node caesar-cipher-cli --action encode --shift 7 --input input.txt --output output.txt
  ```
  If you run this command twice or more times, the new output text will be added to the existing text in "output.txt".

  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt ... + `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

  ```
  > Succeeded.
  ```
2. **All options exist and valid (could use short or long option names), action is decode**
  ```bash
  $ node caesar-cipher-cli -a decode -s 7 -i "./input.txt" -o "./output.txt"
  ```
  or
  ```bash
  $ node caesar-cipher-cli --action decode --shift 7 --input input.txt --output output.txt
  ```
  If you run this command twice or more times, the new output text will be added to the existing text in "output.txt".

  - input.txt `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
  - output.txt ... + `This is secret. Message about "_" symbol!`

  ```
  > Succeeded.
  ```
3. **"action" option is missing**
  ```bash
  $ node caesar-cipher-cli -s 7 -i "./input.txt" -o "./output.txt"
  ```

  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt stays unchanged

  ```
  > error: required option '-a, --action <type>' not specified
  ```

4. **"shift" option is missing**
  ```bash
  $ node caesar-cipher-cli -a encode -i "./input.txt" -o "./output.txt"
  ```

  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt stays unchanged

  ```
  > error: required option '-s, --shift <number>' not specified
  ```

5. **"input" option is missing and "output" file is valid and exists**
  ```bash
  $ node caesar-cipher-cli -a encode -s 7 -o "./output.txt"
  ```
  Command line awaits for text entering. Write any text and press "Enter". If output.txt file was open, please, close and open it again to see new added ciphered text. Press "Enter" in terminal for next translation or press "Ctr + c" to exit.

  - input.txt is not used in this case
  - output.txt ... + `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

  ```
  > This is secret. Message about "_" symbol!
  >
  ```

6. **"output" option is missing and "input" file is valid and exists**
  ```bash
  $ node caesar-cipher-cli -a encode -s 7 -i "./input.txt"
  ```

  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt stays unchanged

  You can see output in command line.

  ```
  > Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!

  ```

7. **"action" option value is empty and other options are valid**
  ```bash
  $ node caesar-cipher-cli -a -s 7 -i "./input.txt" -o "./output.txt"
  ```

  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt stays unchanged

  Command line thinks that "-s" is an "action" option value, so gives error that "shift" is missing.

  ```
  > error: required option '-s, --shift <number>' not specified
  ```

8. **"action" option value is wrong value (not "encode"/"decode") and other options are valid**

  ```bash
  $ node caesar-cipher-cli -a puppy -s 7 -i "./input.txt" -o "./output.txt"
  ```
  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt stays unchanged

  ```
  > error: wrong 'action' option value, must be 'encode' or 'decode'
  ```

9. **"shift" option value is missing (not "encode"/"decode") and other options are valid**
  ```bash
  $ node caesar-cipher-cli -a encode -s -i "./input.txt" -o "./output.txt"
  ```

    Command line thinks that "-i" is a "shift" option value, so thinks that "input" option is missing. Write text and press "Enter" to see the error.

  - input.txt is not used in this case
  - output.txt stays unchanged

  ```
  > This is secret. Message about "_" symbol!
  > error: wrong 'shift' option value, must be an integer number between 0(inclusive) and 26(not inclusive)
  ```

10. **"shift" option value is wrong value (not integer between 0(inclusive) and 26(not inclusive)) and other options are valid**
  ```bash
  $ node caesar-cipher-cli -a encode -s 7.5 -i "./input.txt" -o "./output.txt"
  ```
  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt stays unchanged

  ```
  > error: wrong 'shift' option value, must be an integer number between 0(inclusive) and 26(not inclusive)(inclusive) and 26(not inclusive)
  ```

11. **"input" option value is missing or non-existing file name and other options are valid**
  ```bash
  $ node caesar-cipher-cli -a encode -s 7 -i -o "./output.txt"
  ```

  If "input" option value is missing, then command line thinks that "-0" is an "input" option value (file path), so there is an error that file '-o' does not exist.

  - input.txt is not used in this case
  - output.txt stays unchanged

  ```
  > error: file '-o' does not exist
  ```

12. **"input" value is missing and there is no "output" option**
  ```bash
    $ node caesar-cipher-cli -a encode -s 7 -i
  ```

  - input.txt is not used in this case
  - output.txt stays unchanged

  ```
  > error: option '-i, --input <file_name_input>' argument missing
  ```

13. **"output" option value is missing and other options are valid**
  ```bash
  $ node caesar-cipher-cli -a encode -s 7 -i "./input.txt" -o
  ```

  - input.txt `This is secret. Message about "_" symbol!`
  - output.txt stays unchanged

  ```
  > error: option '-o, --output <file_name_output>' argument missing
  ```

**and more...**