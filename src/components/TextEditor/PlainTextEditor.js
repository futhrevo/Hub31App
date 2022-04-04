import React, { useState, useMemo } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import PropTypes from 'prop-types';

const PlainTextEditor = (props) => {
  const [value, setValue] = useState([{
    type: 'paragraph',
    children: [{ text: props.plainStr }],
  }]);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <div className="shadow p-3">
      <Slate
        editor={editor}
        value={value}
        onChange={(val) => {
          setValue(val);
          // convert value to plain String
          const change = val.map(n => Node.string(n)).join('\n');
          props.onChange(change);
        }}
      >
        <Editable spellCheck autoFocus placeholder={props.placeholder} />
      </Slate>
    </div>
  );
};
// class PlainTextEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'Plain.deserialize(props.html)',
//     };
//   }

//   /**
//    * On change, save the new `value`.
//    *
//    * @param {Editor} editor
//    */

//   onChange = ({ value }) => {
//     // When the document changes, save the serialized HTML to Local Storage.
//     if (value.document !== this.state.value.document) {
//       const string = ' Plain.serialize(value)';
//       this.props.onChange(string);
//     }
//     this.setState({ value });
//   }

//   render() {
//     const { placeholder } = this.props;
//     return (
//       <div className="shadow p-3">
//         <Editor
//           spellCheck
//           autoFocus
//           placeholder={placeholder}
//           value={this.state.value}
//           onChange={this.onChange}
//         />
//       </div>
//     );
//   }
// }

PlainTextEditor.propTypes = {
  plainStr: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

PlainTextEditor.defaultProps = {
  plainStr: '',
  placeholder: 'Enter some text ...',
};
export default PlainTextEditor;
