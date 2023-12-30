import Button from './Button';

function DeleteButton({ handleDeleteItem }) {
  return (
    <Button type="small" onClick={handleDeleteItem}>
      Delete Item
    </Button>
  );
}

export default DeleteButton;
