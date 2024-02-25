import Logo from '@/components/Logo';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import styles from "@/styles/wizard.module.css";
import Link from 'next/link';
import { useSelector } from 'react-redux';

const SingupStepsDone = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store)

  return (
    <div className="container">
      <div >
        <div className="row">
          <div className="col-12">
            <div className={`${styles.common_wizard_wrapper}`}>

              <div>
                <Logo />
              </div>
              <div className="mt-5">
                <h1 style={{fontSize:'24px'}}>{translationDataFromStore?.data?.done}!</h1>
                <p className='grey'>{translationDataFromStore?.data?.signup_complete_description}</p>
              </div>
              <div className={`${styles.common_wizard_btn}`}>
                <div className={styles.button_wrapper}>

                  <div className="mb-3 ">

                    <button
                      className={`btn ${styles.next_button}`}

                    >
                      {translationDataFromStore?.data?.confirm}

                    </button>

                  </div>
                  <div>

                    <button
                      className={`btn ${styles.later_button }`}

                    >
                      {translationDataFromStore?.data?.later}
                    </button>

                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingupStepsDone;
