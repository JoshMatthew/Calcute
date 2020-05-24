const lexer = (function () {
  // Tokenize input so that it will be easier to manipulate
  function tokenize(input) {
    const chars = input.split("");
    const tokens = [];

    while (chars.length) {

      if (!chars.length) {
        break;
      }

      const ch = chars.shift();

      if (isNum(ch)) {
        tokens.push({ type: "NUM", val: ch + readWhile(chars, isNum) });
      } else if (isOp(ch)) {
        tokens.push({ type: "OP", val: ch });
      }
    }

    return infixToReversePolish(tokens);
  }


  // Helper functions
  function readWhile(chars, predicate) {
    let str = "";

    while (chars.length && predicate(chars[0])) {
      str += chars.shift();
    }

    return str;
  }

  function isNum(ch) {
    return /[0-9.]/.test(ch);
  }

  function isOp(ch) {
    return /[()\-+\/*^%√]/.test(ch);
  }


  // Convert the infix notation to postfix or the reverse polish notation
  // using the shaunting yard algorithm
  function infixToReversePolish(tokens) {
    const queue = [];
    const stack = [];
    const precedence = {
      "(": 10,
      "+": 20, "-": 20,
      "/": 30, "*": 30, "%": 30,
      "^": 40, "√": 40
    };

    while (tokens.length) {
      const token = tokens.shift();
      const tkPrec = precedence[token.val] || 0;
      let stPrec = stack.length ? precedence[stack[stack.length - 1].val] : 0;

      if (token.type == "OP" && token.val == ")") {
        let op = null;

        while ((op = stack.pop()).val != "(") {
          queue.push(op);
        }
      } else if (token.type == "NUM") {
        queue.push(token);
      } else if (token.type == "OP" && (!stack.length || token.val == "(" || tkPrec > stPrec)) {
        stack.push(token);
      } else {
        while (tkPrec <= stPrec) {
          queue.push(stack.pop());
          stPrec = stack.length ? precedence[stack[stack.length - 1].val] : 0;
        }

        stack.push(token);
      }
    }

    while (stack.length) {
      queue.push(stack.pop());
    }

    return queue;
  }

  return { tokenize };
})();


// Do the actual computation
function evaluate(tokens) {
  const stack = [];

  while (tokens.length) {
    const token = tokens.shift();
    if (token.type == "NUM") {
      // We only care about the numbers now, not the whole token
      // so we only push the val and make sure it's a number with parseFloat()
      // We need to use parseFloat otherwise we will have trouble with
      // JavaScript's type coercion when we try to do things like (lhs + rhs)
      stack.push(parseFloat(token.val));
      continue;
    }

    // If we reach here we must be working with an operator token
    const rhs = stack.pop();
    const lhs = stack.pop();

    switch (token.val) {
      case "+": stack.push(lhs + rhs); break;
      case "-": stack.push(lhs - rhs); break;
      case "*": stack.push(lhs * rhs); break;
      case "/": stack.push(lhs / rhs); break;
      case "%": stack.push(lhs % rhs); break;
      case "^": stack.push(Math.pow(lhs, rhs)); break;
      case "√": stack.push(Math.sqrt(rhs)); break;
    }
  }

  // Finally we pop our answer off the stack
  return stack.pop();
}