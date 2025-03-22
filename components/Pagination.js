const Pagination = ({ page, pageSize, total}) => {
    const pages = Math.ceil(total/pageSize);
    return (<section className="container mx-auto flex justify-center items-center my-8">
        <a className="mr-2 px-2 py-1 border border-gray-300 rounded" href="#">
          Previous
        </a>
  
        <span className="mx-2">Page {page} of {pages}</span>
  
        <a className="ml-2 px-2 py-1 border border-gray-300 rounded" href="#">
          Next
        </a>
      </section>)
};

export default Pagination;